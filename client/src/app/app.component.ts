import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(0, true, 'top');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    }
  }
}
