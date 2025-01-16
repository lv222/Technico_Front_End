import { Injectable } from '@angular/core';
import { PropertyOwner } from '../model/property-owner';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export type VatAndEmail = {
  vat?: string;
  email?: string;
};

@Injectable({
  providedIn: 'root',
})
export class PropertyOwnerService {
  private URL = 'https://localhost:7108/api';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<PropertyOwner[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .get<PropertyOwner[]>(`${this.URL}/PropertyOwners`, { headers })
      .pipe(map((response: any) => response));
  }

  updateUsers(
    vat: string,
    propertyOwner: PropertyOwner
  ): Observable<PropertyOwner[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .put<PropertyOwner>(`${this.URL}/PropertyOwners/${vat}`, propertyOwner, {
        headers,
      })
      .pipe(map((response: any) => response));
  }

  getPropertyOwnerById(vat: string): Observable<PropertyOwner> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get<PropertyOwner>(
      `${this.URL}/PropertyOwners/${vat}`,
      { headers }
    );
  }

  getUsersByVatAndEmail(vatAndEmail: VatAndEmail): Observable<PropertyOwner[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let params = new HttpParams();
    if (vatAndEmail.vat) {
      params = params.set('vat', vatAndEmail.vat);
    }
    if (vatAndEmail.email) {
      params = params.set('email', vatAndEmail.email);
    }

    return this.httpClient
      .get<PropertyOwner[]>(`${this.URL}/PropertyOwners`, { headers, params })
      .pipe(map((response: any) => response));
  }

  deactivatePropertyOwner(vat: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set('permanent', 'false');

    const url = `${this.URL}/PropertyOwners/${vat}`;

    return this.httpClient.delete(url, { params, headers });
  }

  deletePropertyOwner(vat: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set('permanent', 'true');

    const url = `${this.URL}/PropertyOwners/${vat}`;

    return this.httpClient.delete(url, { params, headers });
  }
}
