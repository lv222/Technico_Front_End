import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Repair } from '../model/repair';

@Injectable({
  providedIn: 'root'
})
export class RepairsService {

  private URL = 'https://localhost:7108/api'
    
    constructor(private httpClient: HttpClient) { }
  
  
    createRepair(data: any) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
          'Authorization': `Bearer ${token}`
        });
        
        return this.httpClient.get(`${this.URL}/Repairs`,{headers}).pipe(map((response: any) => response));
    };
}
