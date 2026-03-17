import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Language, LanguageService } from '../../services/language.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);
  isDropdownOpen = signal<boolean>(false);
  isBlueNav = false;
  private platformId = inject(PLATFORM_ID);

  private languageService = inject(LanguageService);
  private languageSubscription?: Subscription;

  currentLanguage: Language = 'ro';
  isRomanian = true;
  currentFlag = '🇷🇴';
  currentLanguageLabel = 'Română';

  constructor(private router: Router) {}

  ngOnInit() {
    this.isBlueNav = this.router.url.includes('proiect-ganeasa');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBlueNav = event.url.includes('proiect-ganeasa');
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBlueNav = event.url.includes('proiect-ganeasa');
      }
    });

    if (!isPlatformBrowser(this.platformId)) return;

    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.currentLanguage = language;
        this.isRomanian = this.languageService.isRomanian();
        this.currentFlag = this.languageService.getLanguageFlag();
        this.currentLanguageLabel = this.languageService.getLanguageLabel();
        document.documentElement.lang = language;
      },
    );
  }

  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.set(false);
  }

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  getLanguageToggleTitle(): string {
    const otherLang = this.isRomanian ? 'en' : 'ro';
    const otherLangLabel = this.languageService.getLanguageLabel(otherLang);
    return `Switch to ${otherLangLabel}`;
  }
}
