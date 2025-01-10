import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
	email = '';
	password = '';
	loginFailed = false;
	constructor(private http: HttpClient, private router: Router, private authService: AuthService, private fb: FormBuilder) { }

	// loginForm = new FormGroup({
	// 	email: new FormControl('', [Validators.required, Validators.email]),
	// 	password: new FormControl('', [Validators.required])
	//   })

	//   onSubmit(){
	// 	if(this.loginForm.valid){
	// 	  console.log(this.loginForm.value);
	// 	  this.authService.login(this.loginForm.value)
	// 	  .subscribe((data: any) => {
	// 		if(this.authService.isTokenPresent()){
	// 		  this.router.navigate(['/admin-home']);
	// 		}
	// 		console.log(data);
	// 	  });
	// 	}
	//   }
	login() {
		const loginData = {
			email: this.email,
			password: this.password
		};

		this.http.post('https://localhost:7108/api/PropertyOwners/login', loginData).subscribe({
			next: (res: any) => {
				
				localStorage.setItem('token', res.token);
				if(res.userType == "Admin")
				this.router.navigate(['admin-home']).then(() => {
					window.location.reload();
				});
				if(res.userType == "User")
					this.router.navigate(['user-home']).then(() => {
						window.location.reload();
					});
				
			},
			error: (err) => {
				this.loginFailed = true;
				console.error('Login failed', err);
			}
		});
	}
}

