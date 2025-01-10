import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
title = 'TechnicoFront';
  isTokenPresent: boolean = false;

  constructor(private router: Router) {
    const isTokenPresent = !!localStorage.getItem('token'); // Example check for token presence
    this.isTokenPresent = isTokenPresent;

    if (!isTokenPresent) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isTokenPresent = false;
    this.router.navigate(['/login']);
}
}
