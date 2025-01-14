import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Repair } from '../model/repair';

@Injectable({
  providedIn: 'root',
})
export class RepairsService {
  private URL = 'https://localhost:7108/api';
  repairs: Repair[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  filteredRepairs: Repair[] = [];

  constructor(private httpClient: HttpClient) {}

  createRepair(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(`${this.URL}/Repairs`, data, { headers });
  }

  getRepairs(): Observable<Repair[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .get(`${this.URL}/Repairs`, { headers })
      .pipe(map((response: any) => response));
  }

  searchRepairs(
    currentPage: number,
    pageSize: number,
    filters: any,
    token: string | null
  ): Observable<any> {
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams()
      .set('Page', currentPage.toString())
      .set('PageSize', pageSize.toString());

    if (filters.vat) {
      params = params.set('Vat', filters.vat);
    }
    if (filters.minDate) {
      params = params.set('MinDate', filters.minDate);
    }
    if (filters.maxDate) {
      params = params.set('MaxDate', filters.maxDate);
    }

    return this.httpClient.get(`${this.URL}/Repairs`, { params, headers });
  }

  searchTodayRepairs(
    currentPage: number,
    pageSize: number,
    filters: any,
    token: string | null
  ): Observable<any> {
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams()
      .set('Page', currentPage.toString())
      .set('PageSize', pageSize.toString());

    //set local dates
    const today = new Date();
    const todayAthens = new Date(
      today.toLocaleString('en-US', { timeZone: 'Europe/Athens' })
    );
    todayAthens.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowAthens = new Date(
      tomorrow.toLocaleString('en-US', { timeZone: 'Europe/Athens' })
    );
    tomorrowAthens.setHours(0, 0, 0, 0);
    //set ISO format
    const todayISO = todayAthens.toISOString();
    const tomorrowISO = tomorrowAthens.toISOString();

    // Sending today's date as minDate and maxDate to the server
    params = params.set('MinDate', todayISO).set('MaxDate', tomorrowISO);

    if (filters.vat) {
      params = params.set('Vat', filters.vat);
    }

    return this.httpClient.get(`${this.URL}/Repairs`, { params, headers });
  }
}
