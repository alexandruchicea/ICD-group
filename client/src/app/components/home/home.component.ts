import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Language, LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
})
export class HomeComponent implements OnInit {
  isMenuOpen = false;
  private platformId = inject(PLATFORM_ID);

  private languageService = inject(LanguageService);
  private languageSubscription?: Subscription;

  currentLanguage: Language = 'ro';
  isRomanian = true;
  currentFlag = '🇷🇴';
  currentLanguageLabel = 'Română';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.currentLanguage = language;
        this.isRomanian = this.languageService.isRomanian();
        this.currentFlag = this.languageService.getLanguageFlag();
        this.currentLanguageLabel = this.languageService.getLanguageLabel();

        // Update document language
        document.documentElement.lang = language;
      }
    );
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    // Wait for DOM to be ready
    setTimeout(() => {
      const wrapper = document.getElementById('smooth-wrapper');
      const content = document.getElementById('smooth-content');
      if (wrapper && content) {
        ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          effects: true,
        });
      }
    }, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
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
