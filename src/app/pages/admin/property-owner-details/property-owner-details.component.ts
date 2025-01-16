import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { updateOwner } from '../../../model/update-owner';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-owner-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './property-owner-details.component.html',
  styleUrl: './property-owner-details.component.scss',
})
export class PropertyOwnerDetailsComponent implements OnInit {
  propertyOwnerId: string = '';
  propertyOwner: updateOwner | undefined;
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private propertyOwnerService: PropertyOwnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyOwnerId = params['id'];
      // Ensure method is called here
      this.loadPropertyOwnerDetails();
    });
  }

  loadPropertyOwnerDetails(): void {
    // Fetch property owner details from the service using the ID
    this.propertyOwnerService
      .getPropertyOwnerById(this.propertyOwnerId)
      .subscribe({
        next: (response: updateOwner) => {
          this.propertyOwner = response;

          // Initialize the form with fetched data
          this.updateForm = this.fb.group({
            name: [
              this.propertyOwner.name,
              [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z ]+$'), // Only letters and spaces
              ],
            ],
            surname: [
              this.propertyOwner.surname,
              [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z ]+$'),
              ],
            ],
            address: [
              this.propertyOwner.address,
              [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
              ],
            ],
            phoneNumber: [
              this.propertyOwner.phoneNumber,
              [Validators.required],
            ],
            email: [
              this.propertyOwner.email,
              [Validators.required, Validators.email], // Validate email format
            ],

            vat: [
              this.propertyOwner.vat,
              [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9),
                Validators.pattern('^[0-9]+$'), // Ensure VAT is numeric
              ],
            ],
          });
        },
        error: (err) => {
          console.error('Error loading property owner details:', err);
        },
        complete: () => {
          console.log('Property owner details loaded successfully.');
        },
      });
  }

  public onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      const vat = this.updateForm.value.vat; // VAT is used as the ID for updating
      const propertyOwner = this.updateForm.value; // Updated property owner details

      this.propertyOwnerService.updateUsers(vat, propertyOwner).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/properties-and-property-owners']); // Redirect after success
        },
        error: (err: any) => console.log(err),
      });
    }
  }
  get formValues() {
    return {
      name: this.updateForm.get('name'),
      surname: this.updateForm.get('surname'),
      phoneNumber: this.updateForm.get('phoneNumber'),
      address: this.updateForm.get('address'),
      email: this.updateForm.get('email'),
    };
  }

  // Deactivate Property Owner with Confirmation
  deactivatePropertyOwner() {
    const confirmDeactivate = confirm(
      'Are you sure you want to deactivate this owner?'
    );

    if (confirmDeactivate) {
      this.propertyOwnerService
        .deactivatePropertyOwner(this.propertyOwnerId)
        .subscribe({
          next: (response: any) => {
            if (response === null || response === undefined) {
              console.log('Property owner deleted successfully', response);
              this.router.navigate(['/properties-and-property-owners']);
            } else {
              console.error(
                'Error: Empty or unsuccessful response during deletion'
              );
            }
          },

          complete: () => {
            console.log('Delete operation completed');
          },
        });
    } else {
      console.log('Deletion cancelled');
    }
  }

  // Delete Property Owner with Confirmation
  deletePropertyOwner() {
    const confirmDelete = confirm(
      'Are you sure you want to delete this owner?'
    );

    if (confirmDelete) {
      this.propertyOwnerService
        .deletePropertyOwner(this.propertyOwnerId)
        .subscribe({
          next: (response: any) => {
            if (response) {
              console.log('Deletion successful', response);
              this.router.navigate(['/properties-and-property-owners']);
            } else {
              console.error('Error deleting property owner');
            }
          },
          complete: () => {
            alert('Deletion process completed');
            console.log('Deletion process completed');
          },
        });
    } else {
      console.log('Deletion cancelled');
    }
  }
}
