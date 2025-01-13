import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
title = 'TechnicoFront';
  isTokenPresent: boolean = false;
  menuVisible = false;

  constructor(private router: Router) {
    const isTokenPresent = !!localStorage.getItem('token'); 
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
toggleMenu() {
  this.menuVisible = !this.menuVisible;
}
}
