import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-proiect-ganeasa',
  templateUrl: './Proiect-Ganeasa.html',
  styleUrls: ['./Proiect-Ganeasa.css'],
})
export class ProiectGaneasaComponent {
  pdfUrl = 'comunicat-presa.pdf';
  usePdfViewer = true;

  toggleView() {
    this.usePdfViewer = !this.usePdfViewer;
  }
}
