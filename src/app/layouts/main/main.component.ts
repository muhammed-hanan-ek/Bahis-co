import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  isLg = window.matchMedia('(min-width: 1024px)').matches;

  constructor() {
    const media = window.matchMedia('(min-width: 1024px)');
    media.addEventListener('change', (e) => {
      this.isLg = e.matches;
    });
  }
}
