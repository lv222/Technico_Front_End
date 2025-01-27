import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  title = 'TechnicoFront';
  isTokenPresent: boolean = false;
  menuVisible = false;

  constructor(private router: Router) {
    // Directly check for token in localStorage and set the class-level property
    this.isTokenPresent = !!localStorage.getItem('token');

    // If no token is found, navigate to login page
    if (!this.isTokenPresent) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Set the isTokenPresent to false after logout
    this.isTokenPresent = false;
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
