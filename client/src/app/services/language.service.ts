import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'ro' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected-language';
  private readonly DEFAULT_LANGUAGE: Language = 'ro';
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private currentLocale = inject(LOCALE_ID);

  private languageSubject = new BehaviorSubject<Language>(
    this.getCurrentLanguageFromUrl()
  );
  public language$ = this.languageSubject.asObservable();

  constructor() {
    // Set the current language based on URL
    this.languageSubject.next(this.getCurrentLanguageFromUrl());
  }

  /**
   * Get current language from URL path or LOCALE_ID
   */
  getCurrentLanguage(): Language {
    return this.getCurrentLanguageFromUrl();
  }

  /**
   * Get language from current URL or LOCALE_ID
   */
  private getCurrentLanguageFromUrl(): Language {
    // First try to get from LOCALE_ID (works in both SSR and browser)
    if (this.currentLocale === 'en' || this.currentLocale.startsWith('en-')) {
      return 'en';
    }
    if (this.currentLocale === 'ro' || this.currentLocale.startsWith('ro-')) {
      return 'ro';
    }

    // Fallback: try to get from URL in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        const path = this.document.location.pathname;
        if (path.startsWith('/en')) return 'en';
        if (path.startsWith('/ro')) return 'ro';
      } catch (error) {
        console.warn('Error getting language from URL:', error);
      }
    }

    return this.DEFAULT_LANGUAGE;
  }

  /**
   * Toggle language by redirecting to appropriate URL
   */
  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang: Language = currentLang === 'ro' ? 'en' : 'ro';
    this.switchToLanguage(newLang);
  }

  /**
   * Switch to specific language by redirecting
   */
  switchToLanguage(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      // Store preference
      localStorage.setItem(this.STORAGE_KEY, language);

      // Get current path without language prefix
      const currentPath = this.document.location.pathname;
      const pathWithoutLang = this.removeLanguageFromPath(currentPath);
      const search = this.document.location.search;
      const hash = this.document.location.hash;

      // Build new URL
      const newPath = `/${language}${pathWithoutLang}`;
      const newUrl = `${newPath}${search}${hash}`;

      // Redirect to new language
      this.document.location.href = newUrl;
    } catch (error) {
      console.error('Error switching language:', error);
    }
  }

  /**
   * Remove language prefix from path
   */
  private removeLanguageFromPath(path: string): string {
    return path.replace(/^\/(ro|en)/, '') || '/';
  }

  /**
   * Get language label for display
   */
  getLanguageLabel(lang?: Language): string {
    const language = lang || this.getCurrentLanguage();
    return language === 'ro' ? 'Română' : 'English';
  }

  /**
   * Get language flag emoji
   */
  getLanguageFlag(lang?: Language): string {
    const language = lang || this.getCurrentLanguage();
    return language === 'ro' ? '🇷🇴' : '🇬🇧';
  }

  /**
   * Check if current language is Romanian
   */
  isRomanian(): boolean {
    return this.getCurrentLanguage() === 'ro';
  }

  /**
   * Check if current language is English
   */
  isEnglish(): boolean {
    return this.getCurrentLanguage() === 'en';
  }

  /**
   * Get the opposite language for toggle button title
   */
  getToggleLanguage(): Language {
    return this.isRomanian() ? 'en' : 'ro';
  }

  /**
   * Get title for language toggle button
   */
  getLanguageToggleTitle(): string {
    const targetLang = this.getToggleLanguage();
    const targetLabel = this.getLanguageLabel(targetLang);
    return this.isRomanian()
      ? `Comutați la ${targetLabel}`
      : `Switch to ${targetLabel}`;
  }
}
