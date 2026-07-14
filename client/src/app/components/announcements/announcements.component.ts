import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

interface AnnouncementDoc {
  /** Titlul afișat pentru document */
  title: string;
  /** Descriere scurtă — EDITEAZĂ acest text */
  description: string;
  /** Calea către fișier în /public (servit static de la rădăcină) */
  file: string;
  /** Numele cu care se descarcă fișierul */
  downloadName: string;
  /** Tip fișier pentru badge */
  type: 'PDF' | 'DOCX';
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);
  private languageSubscription?: Subscription;

  currentLanguage: Language = 'ro';
  isRomanian = true;

  // ─────────────────────────────────────────────────────────────
  // Documente descărcabile. Editează câmpul `description` la fiecare.
  // Fișierele sunt în client/public/anunturi/ și se servesc de la /anunturi/...
  // ─────────────────────────────────────────────────────────────
  documents: AnnouncementDoc[] = [
    {
      title: 'Anunț procedură competitivă',
      description:
        'Anunțul de lansare a procedurii competitive pentru contractul de proiectare, furnizare și execuție lucrări.',
      file: 'anunturi/anunt-procedura-competitiva-ganeasa.pdf',
      downloadName: 'Anunt procedura competitiva GANEASA.pdf',
      type: 'PDF',
    },
    {
      title: 'Caiet de sarcini — Procedură competitivă',
      description:
        'Specificațiile tehnice și cerințele necesare pentru elaborarea ofertei.',
      file: 'anunturi/caiet-de-sarcini-procedura-competitiva.pdf',
      downloadName: 'Caiet de sarcini Procedura competitiva.pdf',
      type: 'PDF',
    },
    {
      title: 'Lista anexelor — GĂNEASA',
      description: 'Lista anexelor la caietul de sarcini.',
      file: 'anunturi/lista-anexelor-ganeasa.pdf',
      downloadName: 'Lista anexelor GANEASA.pdf',
      type: 'PDF',
    },
    {
      title: 'Lista formularelor — GĂNEASA',
      description: 'Lista formularelor necesare pentru depunerea ofertei.',
      file: 'anunturi/lista-formularelor-ganeasa.docx',
      downloadName: 'Lista formularelor GANEASA.docx',
      type: 'DOCX',
    },
    {
      title:
        'Formularul 17 — Contract de proiectare, furnizare și execuție lucrări',
      description: 'Modelul de contract de proiectare, furnizare și execuție lucrări.',
      file: 'anunturi/formular-17-contract-proiectare-furnizare-executie-lucrari.docx',
      downloadName:
        'Formularul 17 - Contract de proiectare furnizare si executie lucrari.docx',
      type: 'DOCX',
    },
  ];

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.currentLanguage = language;
        this.isRomanian = this.languageService.isRomanian();
        document.documentElement.lang = language;
      },
    );

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
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

  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }
}
