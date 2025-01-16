import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../auth.interceptor';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RepairsService } from '../../../services/repairs.service';
import { Repair } from '../../../model/repair';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-search-repair',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NavbarComponent],
  templateUrl: './search-repair.component.html',
  styleUrl: './search-repair.component.scss',
})
export class SearchRepairComponent {
  searchForm: FormGroup;
  repairs: Repair[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  filteredRepairs: Repair[] = [];
  searchPerformed = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: RepairsService,
    private datePipe: DatePipe
  ) {
    this.searchForm = this.fb.group({
      minDate: [''],
      maxDate: [''],
      page: [1],
      pageSize: [10],
    });
  }

  ngOnInit(): void {}

  searchRepairs(): void {
    const filters = this.searchForm.value;
    this.searchPerformed = true;

    if (!filters.minDate && !filters.maxDate) {
      console.log('No filters applied');
      this.repairs = []; // Reset the repairs list
      return;
    }

    const cleanFilters = {
      minDate: filters.minDate || null,
      maxDate: filters.maxDate || null,
    };

    this.service
      .searchRepairs(this.currentPage, this.pageSize, cleanFilters)
      .subscribe({
        next: (response: any) => {
          this.repairs = response.elements || [];
          this.filteredRepairs = this.repairs;
          this.totalCount = response.totalCount;
        },
        error: (error) => {
          console.error('Failed to fetch repairs:', error);
          this.repairs = [];
          this.totalCount = 0; // Reset count on error
        },
        complete: () => {
          console.log('Repair search completed');
        },
      });
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.repairs = [];
    this.totalCount = 0;
    this.searchPerformed = false;
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchRepairs();
  }

  userFriendlyDate(date: string | null | undefined) {
    return this.datePipe.transform(date, 'medium') || 'Invalid Date';
  }
}
