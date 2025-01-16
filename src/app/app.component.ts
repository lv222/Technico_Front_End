import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgIf } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Technico';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
}
