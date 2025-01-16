import { Component, Injectable, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RepairsService } from '../../../services/repairs.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Repair } from '../../../model/repair';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, FooterComponent],
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
}
