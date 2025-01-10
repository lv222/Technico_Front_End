import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyItem } from '../model/property-item';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyItemService {

  

  private URL = 'https://localhost:7108/api'
    
    constructor(private httpClient: HttpClient) { }
  
  
  
  
    
      getUsers(): Observable<PropertyItem[]> {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        
        return this.httpClient.get(`${this.URL}/PropertyItems`,{headers}).pipe(map((response: any) => response));
      }
}
