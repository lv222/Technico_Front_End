import { Component, Injectable, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RepairsService } from '../../../services/repairs.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Repair } from '../../../model/repair';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit {
  currentDate: string = '';
  propertyRepair?: Repair[];
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private service: RepairsService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.searchTodayRepairs();
  }

  searchTodayRepairs(): void {
    const filters = {}; // You can extend this with other filters like VAT if needed
    this.service
      .searchTodayRepairs(this.currentPage, this.pageSize, filters)
      .subscribe({
        next: (response: any) => {
          this.propertyRepair = response.elements; // Store the repairs
          this.totalCount = response.totalCount; // Store the total count for pagination
          console.log('Repairs fetched for today:', this.propertyRepair);
        },
        error: (error) => {
          console.error('Error fetching repairs:', error);
        },
      });
  }

  userFriendlyDate(date: string | null | undefined) {
    return this.datePipe.transform(date, 'medium') || 'Invalid Date';
  }
  // searchTodayRepairs() {
  //   const filters = {};
  //   this.service.searchTodayRepairs(this.currentPage, this.pageSize, filters).subscribe((response: any) => {
  //     if (response && response.elements) {
  //       // Get today's date in the format YYYY-MM-DD
  //       // const today = new Date();
  //       // const formattedToday = today.toLocaleDateString('el-GR'); // Format as YYYY-MM-DD
  //       // console.log("Today's date:", formattedToday);
  //       // Filter repairs that are scheduled for today
  //       this.propertyRepair = response.elements.filter((repair: Repair) => {
  //         const repairDate = new Date(repair.repairDate);
  //         const formattedRepairDate = repairDate.toLocaleDateString('el-GR'); // Format as YYYY-MM-DD
  //         return formattedRepairDate === formattedToday; // Compare dates
  //       });

  //       console.log(`Repairs scheduled for today:`, this.propertyRepair);
  //     } else {
  //       this.propertyRepair = [];
  //     }
  //   });
  // }
}
// private getRepairs() {
//   this.service.getRepairs().subscribe((response: any) => {
//     if (response && response.elements) {
//       this.propertyRepair = response.elements;

//       // this.propertyRepair?.forEach(repair => {
//       //   const repairDate = new Date(repair.repairDate);
//       //   console.log(repairDate)

//       //   const formattedRepairDate = repairDate.toISOString().split('T')[0];
//       // console.log(`Repair date: ${formattedRepairDate}`);

//       // });
//     } else {
//       this.propertyRepair = [];
//     }
//     console.log(response);
//     console.log(this.propertyRepair);
//   });
// }

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
