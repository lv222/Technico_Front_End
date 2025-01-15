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
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .get<PropertyOwner[]>(`${this.URL}/PropertyOwners`, { headers })
      .pipe(map((response: any) => response));
  }

  updateUsers(
    vat: string,
    propertyOwner: PropertyOwner
  ): Observable<PropertyOwner[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .put<PropertyOwner>(`${this.URL}/PropertyOwners/${vat}`, propertyOwner, {
        headers,
      })
      .pipe(map((response: any) => response));
  }

  getPropertyOwnerById(vat: string): Observable<PropertyOwner> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<PropertyOwner>(
      `${this.URL}/PropertyOwners/${vat}`,
      { headers }
    );
  }

  getUsersByVatAndEmail(vatAndEmail: VatAndEmail): Observable<PropertyOwner[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

  //   deletePropertyOwnerByVat(permanent: boolean): Observable<PropertyOwner> {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     });

  // 	let params = new HttpParams();
  //     params = params.set()

  //     return this.httpClient
  //       .delete<any>(`${this.URL}/PropertyOwners/${vat}`, { headers })
  //       .pipe(map((response: any) => response));
  //   }
  deactivatePropertyOwner(vat: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    // Define query parameters
    const params = new HttpParams().set('permanent', 'false');

    // Construct the URL with the ownerId
    const url = `${this.URL}/PropertyOwners/${vat}`;

    // Make the DELETE request with the query parameters
    return this.httpClient.delete(url, { params, headers });
  }

  deletePropertyOwner(vat: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    // Define query parameters
    const params = new HttpParams().set('permanent', 'true');

    // Construct the URL with the ownerId
    const url = `${this.URL}/PropertyOwners/${vat}`;

    // Make the DELETE request with the query parameters
    return this.httpClient.delete(url, { params, headers });
  }
}
