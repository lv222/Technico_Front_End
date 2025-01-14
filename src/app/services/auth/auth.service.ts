import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: any;
  // isTokenPresent: boolean = false;
  constructor(private httpClient: HttpClient) {}

  URL = 'https://localhost:7108/api';

  signup(data: any) {
    return this.httpClient.post(`${this.URL}/PropertyOwners`, data);
  }

  login(loginData: any) {
    return this.httpClient.post(
      'https://localhost:7108/api/PropertyOwners/login',
      loginData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  isTokenPresent(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  // Method to decode the token and retrieve the user type (admin, user, etc.)
  getUserType(): string {
    const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token

        return decodedToken?.userType || 'User'; // Default to 'User' if no userType exists
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return 'User'; // Fallback in case decoding fails
      }
    }

    return 'User'; // If no token, default to 'User'
  }
}
