import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-owner',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.scss',
})
export class CreateOwnerComponent {
  createOwnerForm!: FormGroup;

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
        'Aa123!123!',
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
    this.onFormControlValueChanges('name'); // Capitalize 'name'
    this.onFormControlValueChanges('surname'); // Capitalize 'surname'
    this.onFormControlValueChanges('address'); // Capitalize 'address'
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
  get formValues() {
    return {
      name: this.createOwnerForm.get('name'),
      surname: this.createOwnerForm.get('surname'),
      vat: this.createOwnerForm.get('vat'),
      phoneNumber: this.createOwnerForm.get('phoneNumber'),
      address: this.createOwnerForm.get('address'),
      email: this.createOwnerForm.get('email'),
    };
  }
  private onFormControlValueChanges(controlName: string): void {
    const control = this.createOwnerForm.get(controlName);

    control?.valueChanges.subscribe((value) => {
      // Apply capitalization function
      const capitalizedValue = this.capitalize(value);
      // Update the form control value with the capitalized string
      control.setValue(capitalizedValue, { emitEvent: false }); // Don't emit event again
    });
  }

  // Capitalize function
  private capitalize(value: string): string {
    if (!value) return value; // Handle null or undefined
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' ');
  }
}
