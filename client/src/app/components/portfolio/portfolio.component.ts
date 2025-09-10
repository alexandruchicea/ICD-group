import {
  Component,
  Inject,
  inject,
  LOCALE_ID,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

type Project = {
  name: string;
  location: string;
  year: string;
  type: Record<'ro' | 'en', string>;
  image: string;
};

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  getLanguageToggleTitle() {
    throw new Error('Method not implemented.');
  }
  toggleLanguage() {
    throw new Error('Method not implemented.');
  }
  isMenuOpen = false;
  private platformId = inject(PLATFORM_ID);

  private languageService: LanguageService = inject(LanguageService);
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

  constructor(@Inject(LOCALE_ID) public currentLang: 'ro' | 'en') {}

  projects: Project[] = [
    {
      name: 'Petru Rares Residence',
      location: 'Str. Petru Rareș, 5-9, Sector 1, București',
      year: '2020',
      type: { ro: 'Rezidențial Premium', en: 'Premium Residential' },
      image: '/Petru rares 2.jpg',
    },
    {
      name: 'Dr Felix',
      location: 'Str. Dr Felix 26, Sector 1, București',
      year: '2016',
      type: { ro: 'Rezidențial Premium', en: 'Premium Residential' },
      image: '/Dr Felix.jpg',
    },
    {
      name: 'Smart City Residence 1,2,3',
      location: 'Bragadiru, Ilfov',
      year: '2014-2018',
      type: { ro: 'Rezidențial Modern', en: 'Modern Residential' },
      image: '/Diamantului 3.jpg',
    },
    {
      name: 'Ela Cotroceni',
      location: 'Nutu Ion 2',
      year: '2023',
      type: { ro: 'Rezidențial', en: 'Residential' },
      image: '/Ela Cotroceni 1.jpeg',
    },
    {
      name: 'Bastiliei',
      location: 'Str. Caderea Bastiliei 52',
      year: '2022',
      type: { ro: 'Birouri', en: 'Office' },
      image: '/caderea bastiliei 2.jpg',
    },
    {
      name: 'Razoare',
      location: 'Strada Progresului 25-27',
      year: '2022',
      type: { ro: 'Industrial/Office', en: 'Industrial/Office' },
      image: '/Razaore Offices 1.jpg',
    },
    {
      name: 'Ghermanesti',
      location: 'Ghermanesti, Ilfov',
      year: '2023',
      type: { ro: 'Comercial', en: 'Commercial' },
      image: '/ghermanesti.png',
    },
    {
      name: 'Tarlungeni',
      location: 'Tarlungeni Brasov',
      year: '2025',
      type: { ro: 'Comercial', en: 'Commercial' },
      image: '/ghermanesti.png',
    },
    {
      name: 'Dragalina',
      location: 'Dr Dragalina',
      year: '2021',
      type: { ro: 'Aparthotel', en: 'Aparthotel' },
      image: '/Dragalina 1.jpeg',
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
