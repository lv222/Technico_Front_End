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
  propertyRepairs?: Repair[];
 constructor(private service: RepairsService) {}

 ngOnInit(): void {
  this.getRepairs();
  
}
 private getRepairs() {
  this.service.getRepairs().subscribe((response: any) => {
    if (response && response.elements) {
      console.log(response);
      this.propertyRepairs = response.elements;
    } else {
      this.propertyRepairs = [];
    }
    console.log(this.propertyRepairs);
  });
}

public hasPendingRepairs(): boolean {
  // do we have any repairs at all?
  if (this.propertyRepairs === undefined) {
    return false;
  } else {
    // do we have any repairs with status Pending?
    const containsPropertyRepairWithPendingStatus = this.propertyRepairs?.some(propertyRepair => {
      return propertyRepair.status === "Pending";
    });

    return containsPropertyRepairWithPendingStatus;
  }
}
}