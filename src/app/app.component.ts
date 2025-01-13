import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from "./pages/admin/admin-home/admin-home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgIf } from '@angular/common';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminHomeComponent, LoginComponent, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Technico';


	constructor(private router: Router, private authService: AuthService ) {}
		

		ngOnInit(): void {
			
		
	// 	if (this.authService.isTokenPresent()) {
	// 		const userType = this.authService.getUserType(); // Get userType from token
	  
	// 		// Redirect based on the userType
	// 		if (userType === 'Admin') {
	// 		  this.router.navigate(['/admin-home']);
	// 		} else if (userType === 'User') {
	// 		  this.router.navigate(['/user-home']);
	// 		}
	// 	  } else {
	// 		// If no token is present, redirect to login
	// 		this.router.navigate(['/login']);
	// }

	
}}
