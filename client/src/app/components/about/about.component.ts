import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);


  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
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
}
