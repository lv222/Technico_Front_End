import { Component, Injectable, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { RepairsService } from '../../../services/repairs.service';
import { NgFor, NgIf } from '@angular/common';
import { Repair } from '../../../model/repair';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { PropertyOwner } from '../../../model/property-owner';
import { PropertyItemService } from '../../../services/property-item.service';
import { PropertyItem } from '../../../model/property-item';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  currentDate: any;
  propertyRepair?: Repair[];

  constructor(private service:RepairsService) {}

  ngOnInit() {
    this.getRepairs();
    // this.checkDateMatch();
  }

  private getRepairs() {
    this.service.getRepairs().subscribe((response: any) => {
      if (response && response.elements) {
      
        this.propertyRepair = response.elements;

        

        // this.propertyRepair?.forEach(repair => {
        //   const repairDate = new Date(repair.repairDate);
        //   console.log(repairDate)
    
        //   const formattedRepairDate = repairDate.toISOString().split('T')[0];
        // console.log(`Repair date: ${formattedRepairDate}`);
    
        
        
        // });
        
      } else {
        
        this.propertyRepair = [];
      }
      console.log(response);
      console.log(this.propertyRepair);
      
     
    });
  }

//   checkDateMatch() {
//     const currentDate = new Date();
//     const formattedCurrentDate = currentDate.toISOString().split('T')[0]; 
//   console.log(`Today's date: ${formattedCurrentDate}`);
//     this.service.getRepairs().subscribe((response: any) => {
//       if (response && response.elements) {
      
//         this.propertyRepair = response.elements;
//     this.propertyRepair?.forEach(repair => {
//       const repairDate = new Date(repair.repairDate);
//       console.log(repairDate)

//       const formattedRepairDate = repairDate.toISOString().split('T')[0];
//     console.log(`Repair date: ${formattedRepairDate}`);

    
    
//     })
// }})
     

//     }

}
