import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

interface AnnouncementDoc {
  /** Titlu RO / EN — EDITEAZĂ aceste texte */
  titleRo: string;
  titleEn: string;
  /** Descriere RO / EN — EDITEAZĂ aceste texte */
  descRo: string;
  descEn: string;
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
      titleRo: 'Anunț procedură competitivă',
      titleEn: 'Competitive procedure announcement',
      descRo:
        'Anunțul de lansare a procedurii competitive pentru contractul de proiectare, furnizare și execuție lucrări.',
      descEn:
        'The launch announcement of the competitive procedure for the design, supply and works execution contract.',
      file: 'anunturi/anunt-procedura-competitiva-ganeasa.pdf',
      downloadName: 'Anunt procedura competitiva GANEASA.pdf',
      type: 'PDF',
    },
    {
      titleRo: 'Caiet de sarcini — Procedură competitivă',
      titleEn: 'Tender specifications — Competitive procedure',
      descRo:
        'Specificațiile tehnice și cerințele necesare pentru elaborarea ofertei.',
      descEn:
        'The technical specifications and requirements needed to prepare the bid.',
      file: 'anunturi/caiet-de-sarcini-procedura-competitiva.pdf',
      downloadName: 'Caiet de sarcini Procedura competitiva.pdf',
      type: 'PDF',
    },
    {
      titleRo: 'Lista anexelor — GĂNEASA',
      titleEn: 'List of annexes — GĂNEASA',
      descRo: 'Lista anexelor la caietul de sarcini.',
      descEn: 'The list of annexes to the tender specifications.',
      file: 'anunturi/lista-anexelor-ganeasa.pdf',
      downloadName: 'Lista anexelor GANEASA.pdf',
      type: 'PDF',
    },
    {
      titleRo: 'Lista formularelor — GĂNEASA',
      titleEn: 'List of forms — GĂNEASA',
      descRo: 'Lista formularelor necesare pentru depunerea ofertei.',
      descEn: 'The list of forms required for submitting the bid.',
      file: 'anunturi/lista-formularelor-ganeasa.docx',
      downloadName: 'Lista formularelor GANEASA.docx',
      type: 'DOCX',
    },
    {
      titleRo:
        'Formularul 17 — Contract de proiectare, furnizare și execuție lucrări',
      titleEn: 'Form 17 — Design, supply and works execution contract',
      descRo:
        'Modelul de contract de proiectare, furnizare și execuție lucrări.',
      descEn: 'The template for the design, supply and works execution contract.',
      file: 'anunturi/formular-17-contract-proiectare-furnizare-executie-lucrari.docx',
      downloadName:
        'Formularul 17 - Contract de proiectare furnizare si executie lucrari.docx',
      type: 'DOCX',
    },
  ];

  /** Documentele localizate în funcție de limba curentă (RO/EN). */
  get localizedDocuments() {
    const ro = this.languageService.isRomanian();
    return this.documents.map((d) => ({
      title: ro ? d.titleRo : d.titleEn,
      description: ro ? d.descRo : d.descEn,
      file: d.file,
      downloadName: d.downloadName,
      type: d.type,
    }));
  }

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
