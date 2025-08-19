import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

type Project = {
  name: string;
  location: string;
  year: string;
  type: string;
  image: string;
};

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  isMenuOpen = false;
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

  projects: Project[] = [
    {
      name: 'Petru Rares Residence',
      location: 'Str. Petru Rareș, 5-9, Sector 1, București',
      year: '2020',
      type: 'Rezidențial Premium',
      image: '/Petru rares 2.jpg',
    },
    {
      name: 'Dr Felix',
      location: 'Str. Dr Felix 26, Sector 1, București',
      year: '2016',
      type: 'Rezidențial Premium',
      image: '/Dr Felix.jpg',
    },
    {
      name: 'Smart City Residence 1,2,3',
      location: 'Bragadiru, Ilfov',
      year: '2014-2018',
      type: 'Rezidențial Modern',
      image: '/Diamantului 3.jpg',
    },
    {
      name: 'Ela Cotroceni',
      location: 'Nutu Ion 2',
      year: '2023',
      type: 'Rezidential',
      image: '/Ela Cotroceni 1.jpeg',
    },
    {
      name: 'Bastiliei',
      location: 'Str. Caderea Bastiliei 52',
      year: '2022',
      type: 'Office',
      image: '/caderea bastiliei 2.jpg',
    },
    {
      name: 'Razoare',
      location: 'Strada Progresului 25-27',
      year: '2022',
      type: 'Industrial/Office',
      image: '/Razaore Offices 1.jpg',
    },
    {
      name: 'Ghermanesti',
      location: 'Ghermanesti, Ilfov',
      year: '2023',
      type: 'Commercial',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    },
    {
      name: 'Tarlungeni',
      location: 'Tarlungeni Brasov',
      year: '2025',
      type: 'Comercial',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    },
    {
      name: 'Dragalina',
      location: 'Dr Dragalina',
      year: '2021',
      type: 'Aparthotel',
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
