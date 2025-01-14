import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-create-owner',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.scss',
})
export class CreateOwnerComponent {
  public createOwnerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createOwnerForm = this.fb.group({
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
      phoneNumber: ['', [Validators.required]],
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
          Validators.pattern(
            '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*'
          ), // Must contain Uppercase,Lowercase,Digit,Special Character
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

  public onSubmitCreateOwner() {
    if (this.createOwnerForm.valid) {
      console.log(this.createOwnerForm.value);

      this.authService.signup(this.createOwnerForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/properties-and-property-owners']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
