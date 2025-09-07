import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'ro' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected-language';
  private readonly DEFAULT_LANGUAGE: Language = 'ro';

  private languageSubject = new BehaviorSubject<Language>(
    this.getStoredLanguage()
  );
  public language$ = this.languageSubject.asObservable();

  constructor() {
    // Initialize with stored language or default
    this.setLanguage(this.getStoredLanguage());
  }

  /**
   * Get the currently selected language
   */
  getCurrentLanguage(): Language {
    return this.languageSubject.value;
  }

  /**
   * Set the language and save to localStorage
   */
  setLanguage(language: Language): void {
    localStorage.setItem(this.STORAGE_KEY, language);
    this.languageSubject.next(language);
  }

  /**
   * Toggle between Romanian and English
   */
  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang: Language = currentLang === 'ro' ? 'en' : 'ro';
    this.setLanguage(newLang);
  }

  /**
   * Get language from localStorage or return default
   */
  private getStoredLanguage(): Language {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    return stored && (stored === 'ro' || stored === 'en')
      ? stored
      : this.DEFAULT_LANGUAGE;
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
}
