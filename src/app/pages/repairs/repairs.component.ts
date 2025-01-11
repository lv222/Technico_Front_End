import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RepairsService } from '../../services/repairs.service';
import { Repair } from '../../model/repair';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-repairs',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, NavbarComponent ],
  templateUrl: './repairs.component.html',
  styleUrl: './repairs.component.scss'
})
export class RepairsComponent {
  propertyrepairs?: Repair[];
 constructor(private service: RepairsService) {}

 ngOnInit(): void {
  this.getRepairs();
  
}
 private getRepairs() {
  this.service.getRepairs().subscribe((response: any) => {
    if (response && response.elements) {
      this.propertyrepairs = response.elements;
    } else {
      this.propertyrepairs = [];
    }
    console.log(this.propertyrepairs);
  });
}
}