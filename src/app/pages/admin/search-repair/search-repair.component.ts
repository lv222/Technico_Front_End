import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../auth.interceptor';
import { NgFor } from '@angular/common';
import { RepairsService } from '../../../services/repairs.service';
import { Repair } from '../../../model/repair';

@Component({
  selector: 'app-search-repair',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './search-repair.component.html',
  styleUrl: './search-repair.component.scss',
})
export class SearchRepairComponent {
  searchForm: FormGroup;
  repairs: Repair[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  filteredRepairs: Repair[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: RepairsService
  ) {
    this.searchForm = this.fb.group({
      vat: [''],
      minDate: [''],
      maxDate: [''],
      page: [1],
      pageSize: [10],
    });
  }

  ngOnInit(): void {}

  searchRepairs(): void {
    const token = localStorage.getItem('token');
    const filters = this.searchForm.value;

    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams()
      .set('Page', this.currentPage.toString())
      .set('PageSize', this.pageSize.toString());

    if (filters.vat) {
      params = params.set('Vat', filters.vat);
    }
    if (filters.minDate) {
      params = params.set('MinDate', filters.minDate);
    }
    if (filters.maxDate) {
      params = params.set('MaxDate', filters.maxDate);
    }

    this.http
      .get('https://localhost:7108/api/Repairs', { params, headers })
      .subscribe((response: any) => {
        this.repairs = response.elements;
        this.filteredRepairs = [...this.repairs];
        this.totalCount = response.totalCount;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchRepairs();
  }
}
