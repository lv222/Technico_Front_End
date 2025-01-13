import { Injectable } from '@angular/core';
import { PropertyOwner } from '../model/property-owner';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export type VatAndEmail = {
	vat?: string,
	email?: string,
}

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService {
  // publishData(propertyowner: PropertyOwner[]) {
  //   throw new Error('Method not implemented.');
  // }
private URL = 'https://localhost:7108/api'
  
  constructor(private httpClient: HttpClient) { }




  
    getUsers(): Observable<PropertyOwner[]> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
      return this.httpClient.get<PropertyOwner[]>(`${this.URL}/PropertyOwners`,{headers}).pipe(map((response: any) => response));
  };

  updateUsers(vat: string, propertyOwner: PropertyOwner): Observable<PropertyOwner[]> {
	const token = localStorage.getItem('token');
	if (!token) {
	  throw new Error('No token found');
	}
	const headers = new HttpHeaders({
	  'Content-Type': 'application/json',
	  'Authorization': `Bearer ${token}`
	});
	
	return this.httpClient
      .put<PropertyOwner>(`${this.URL}/PropertyOwners/${vat}`, propertyOwner, {
        headers,
      })
      .pipe(map((response: any) => response));

};

//   getUsersByVatAndEmail(vat: string, email?: string): Observable<PropertyOwner[]> {
// 		const token = localStorage.getItem('token');
// 		if (!token) {
// 			throw new Error('No token found');
// 		}
// 		const headers = new HttpHeaders({
// 			'Content-Type': 'application/json',
// 			'Authorization': `Bearer ${token}`
// 		});

// 		return this.httpClient.get<PropertyOwner[]>(`${this.URL}/PropertyOwners/${vat}`, { headers }).pipe(map((response: any) => response));
// 	};
getPropertyOwnerById(vat: string): Observable<PropertyOwner> {
	const token = localStorage.getItem('token');
	if (!token) {
	  throw new Error('No token found');
	}
  
	const headers = new HttpHeaders({
	  'Content-Type': 'application/json',
	  'Authorization': `Bearer ${token}`
	});
  
	return this.httpClient.get<PropertyOwner>(`${this.URL}/PropertyOwners/${vat}`, { headers });
  }

getUsersByVatAndEmail(vatAndEmail: VatAndEmail): Observable<PropertyOwner[]> {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No token found');
	}

	const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	});

	let params = new HttpParams();
	if (vatAndEmail.vat) {
		params = params.set('vat', vatAndEmail.vat);
	}
	if (vatAndEmail.email) {
		params = params.set('email', vatAndEmail.email);
	}

	return this.httpClient.get<PropertyOwner[]>(`${this.URL}/PropertyOwners`, { headers, params }).pipe(map((response: any) => response));
};

	deletePropertyOwnerByVat(vat: string): Observable<PropertyOwner> {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		});

		return this.httpClient
		.delete<any>(`${this.URL}/PropertyOwners/${vat}`, { headers })
		.pipe(map((response: any) => response));
	}
}

