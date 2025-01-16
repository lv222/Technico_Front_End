import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyItem } from '../model/property-item';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyItemService {
  private URL = 'https://localhost:7108/api';

  constructor(private httpClient: HttpClient) {}

  getProperties(page: number, pageSize: number): Observable<PropertyItem[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    return this.httpClient
      .get(`${this.URL}/PropertyItems`, { headers, params })
      .pipe(map((response: any) => response));
  }
}
