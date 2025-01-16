import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RepairsService } from '../../../services/repairs.service';
import { Repair } from '../../../model/repair';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-repairs',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    NavbarComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './repairs.component.html',
  styleUrl: './repairs.component.scss',
})
export class RepairsComponent {
  propertyRepairs?: Repair[];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  status = 'Pending';
  constructor(private service: RepairsService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getPendingRepairs();
  }
  private getPendingRepairs() {
    this.service
      .getPendingRepairs(this.currentPage, this.pageSize, this.status)
      .subscribe((response: any) => {
        if (response && response.elements) {
          console.log(response);

          this.propertyRepairs = response.elements;
          this.totalCount = response.totalCount;
        } else {
          this.propertyRepairs = [];
        }

        console.log(this.propertyRepairs);
      });
  }

  userFriendlyDate(date: string | null | undefined) {
    return this.datePipe.transform(date, 'medium') || 'Invalid Date';
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getPendingRepairs();
  }

  // public hasPendingRepairs(): boolean {
  //   // do we have any repairs at all?
  //   if (this.propertyRepairs === undefined) {
  //     return false;
  //   } else {
  //     // do we have any repairs with status Pending?
  //     const containsPropertyRepairWithPendingStatus =
  //       this.propertyRepairs?.some((propertyRepair) => {
  //         return propertyRepair.status === 'Pending';
  //       });

  //     return containsPropertyRepairWithPendingStatus;
  //   }
  // }
}
