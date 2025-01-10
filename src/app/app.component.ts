import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from "./pages/admin-home/admin-home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgIf } from '@angular/common';
import { NavbarComponent } from "./pages/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminHomeComponent, LoginComponent, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Technico';
  isTokenPresent: boolean = false;

	constructor(private router: Router) {
		const isTokenPresent = !!localStorage.getItem('token'); // Example check for token presence
		this.isTokenPresent = isTokenPresent;

		if (!isTokenPresent) {
			this.router.navigate(['/login']);
		}
	}

	// logout() {
	// 	localStorage.removeItem('token');
	// 	this.isTokenPresent = false;
	// 	this.router.navigate(['/login']);
	// }
}
