import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { API_URL } from '../../../app.config.url';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements AfterViewInit, OnInit {
  getLanguageToggleTitle() {
    throw new Error('Method not implemented.');
  }
  toggleLanguage() {
    throw new Error('Method not implemented.');
  }
  @ViewChild('recaptchaElem', { static: false }) recaptchaElem!: ElementRef;
  widgetId: number | null = null;

  isMenuOpen = false;
  private platformId = inject(PLATFORM_ID);

  private languageService = inject(LanguageService);
  private languageSubscription?: Subscription;

  currentLanguage: Language = 'ro';
  isRomanian = true;
  currentFlag = '🇷🇴';
  currentLanguageLabel = 'Română';

  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    partnershipType: '',
  };

  submitting: 'pending' | 'success' | 'error' | 'idle' = 'idle';
  recaptchaError = false;
  submitError = '';

  partnershipTypes = [
    'Investitor',
    'Proprietar de Teren',
    'Partener Industrial',
    'Alt tip de parteneriat',
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderRecaptcha();
    }
  }

  renderRecaptcha() {
    // Wait for reCAPTCHA to be loaded
    if (typeof window.grecaptcha === 'undefined') {
      // If reCAPTCHA is not loaded yet, wait and retry
      setTimeout(() => this.renderRecaptcha(), 100);
      return;
    }

    // Remove any previous widget if present
    if (this.widgetId !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(this.widgetId);
      } catch (e) {
        console.log('Error resetting reCAPTCHA:', e);
      }
    }

    // Render the widget
    if (
      window.grecaptcha &&
      this.recaptchaElem &&
      this.recaptchaElem.nativeElement
    ) {
      try {
        this.widgetId = window.grecaptcha.render(
          this.recaptchaElem.nativeElement,
          {
            sitekey: '6LenC6YrAAAAAH-W_TXKfAmiB8S3tJ4_RLJ__74h',
            callback: () => {
              console.log('reCAPTCHA completed');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
              this.recaptchaError = true;
            },
          }
        );
        console.log('reCAPTCHA widget rendered with ID:', this.widgetId);
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    } else {
      console.log('reCAPTCHA or element not ready, retrying...');
      setTimeout(() => this.renderRecaptcha(), 100);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.recaptchaError = false;
    this.submitError = '';

    if (
      !this.contactForm.name ||
      !this.contactForm.email ||
      !this.contactForm.message
    ) {
      this.submitting = 'error';
      return;
    }

    let recaptchaValue = '';
    if (window.grecaptcha && this.widgetId !== null) {
      try {
        recaptchaValue = window.grecaptcha.getResponse(this.widgetId);
      } catch (error) {
        console.error('Error getting reCAPTCHA response:', error);
      }
    }

    if (!recaptchaValue || !recaptchaValue.trim()) {
      this.recaptchaError = true;
      return;
    }

    this.submitting = 'pending';

    this.http
      .post(`${API_URL}/contact`, {
        recaptchaToken: recaptchaValue,
        name: this.contactForm.name,
        email: this.contactForm.email,
        message: this.contactForm.message,
        phone: this.contactForm.phone,
        company: this.contactForm.company,
        partnershipType: this.contactForm.partnershipType,
      })
      .subscribe({
        next: (response: any) => {
          this.submitError = '';
          this.submitting = 'success';
          this.cdr.detectChanges();

          this.contactForm = {
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            partnershipType: '',
          };

          if (window.grecaptcha && this.widgetId !== null) {
            try {
              window.grecaptcha.reset(this.widgetId);
            } catch (e) {}
          }

          setTimeout(() => {
            this.submitting = 'idle';
          }, 5000);
        },
        error: (error: any) => {
          this.submitError =
            error.error?.error ||
            error.error?.message ||
            'A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.';
          this.submitting = 'error';

          if (window.grecaptcha && this.widgetId !== null) {
            try {
              window.grecaptcha.reset(this.widgetId);
            } catch (e) {}
          }
        },
      });
  }
}
