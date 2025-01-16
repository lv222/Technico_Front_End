import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss',
})
export class UserNavbarComponent {
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
