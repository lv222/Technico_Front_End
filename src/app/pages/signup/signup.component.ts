import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// interface FormData {
// name: string;
// surname: string;
// address: string;
// email: string;
// password: string;
// vat: string;
// }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  public signupForm!: FormGroup;
  
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){}
  
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'), // Allow only letters and spaces
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'), // Allow only letters and spaces
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email, // Validate email format
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*'), // Must contain Uppercase,Lowercase,Digit,Special Character
        ],
      ],
      vat: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]+$'), // Ensure VAT is numeric
        ],
      ],
    });
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err)
        });
    }
}
}