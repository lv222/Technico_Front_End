import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})

export class AuthService {
  router: any;
  
  constructor(private httpClient: HttpClient) { }
  
  email = '';
	password = '';
	loginFailed = false;
  URL = 'https://localhost:7108/api';
  
  signup(data: any) {
    return this.httpClient.post(`${this.URL}/PropertyOwners`, data);
   
  }
//   login(data: any) {
//     return this.httpClient.post(`${this.URL}/login`, data)
//       .pipe(map((data: any) => {
//         // localStorage.setItem('token', JSON.stringify(result));
//         localStorage.setItem('token', data.token);
// 				if(data.userType == "Admin")
// 				this.router.navigate(['admin-home']).then(() => {
// 					window.location.reload();
// 				});
// 				if(data.userType == "User")
// 					this.router.navigate(['user-home']).then(() => {
// 						window.location.reload();
// 					});
//       }));
//   }
	

 
// isTokenPresent() {
//   return localStorage.getItem('token') !== null;
// }
  
   
  
}


