import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-energy-solutions',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './energy-solutions.component.html',
  styleUrls: ['./energy-solutions.component.css']
})
export class EnergySolutionsComponent implements OnInit {
  isMenuOpen = false;

  ngOnInit() {
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
          effects: true
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