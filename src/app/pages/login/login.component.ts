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
	
	loginForm: FormGroup;
  	loginFailed = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public onSubmit() {
    const loginData = this.loginForm.value;
	
    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
		
		
		console.log(res.userType);
		console.log(res.token);
		// console.log(localStorage.getItem('user_data'));


        if (res.userType === 'Admin') {
          this.router.navigate(['admin-home']).then(() => {
            window.location.reload();
          });
        } else if (res.userType === 'User') {
          this.router.navigate(['user-home']).then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        this.loginFailed = true;
        console.error('Login failed', err);
      },
    });
  }
}
	