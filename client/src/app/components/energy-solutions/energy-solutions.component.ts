import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-energy-solutions',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './energy-solutions.component.html',
  styleUrls: ['./energy-solutions.component.css'],
})
export class EnergySolutionsComponent implements OnInit {
  getLanguageToggleTitle() {
    throw new Error('Method not implemented.');
  }
  toggleLanguage() {
    throw new Error('Method not implemented.');
  }
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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        // Type assertion to Language
        const lang = language as Language;
        this.currentLanguage = lang;
        this.isRomanian = this.languageService.isRomanian();
        this.currentFlag = this.languageService.getLanguageFlag();
        this.currentLanguageLabel = this.languageService.getLanguageLabel();

        // Update document language
        document.documentElement.lang = lang;
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
}
