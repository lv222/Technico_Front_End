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

  
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){}
  
  
  ngOnInit(): void {}

//     this.form = this.fb.group({
//   name: ['', [Validators.required]],
//   surname: ['', 
//     [Validators.required]],
//     address: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required],
//     vat: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
// })  }

    public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    email: new FormControl('', 
      [Validators.required, 
        Validators.email]),
    password: new FormControl('', 
      [Validators.required, 
        Validators.minLength(8), 
        Validators.pattern('[A-Z]'), 
        Validators.pattern('[a-z]'), 
        Validators.pattern('[0-9]'), 
        Validators.pattern('[0-9]')]),
    vat: new FormControl('', 
      [Validators.required,Validators.minLength(9),
        Validators.maxLength(9)
      ])
  })


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