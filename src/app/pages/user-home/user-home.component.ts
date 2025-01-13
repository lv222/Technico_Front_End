import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

}
