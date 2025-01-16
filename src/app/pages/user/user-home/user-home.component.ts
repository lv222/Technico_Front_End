import { Component } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [UserNavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {}
