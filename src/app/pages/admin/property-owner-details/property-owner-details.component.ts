import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyOwner } from '../../../model/property-owner';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { updateOwner } from '../../../model/update-owner';

@Component({
  selector: 'app-property-owner-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './property-owner-details.component.html',
  styleUrl: './property-owner-details.component.scss',
})
export class PropertyOwnerDetailsComponent implements OnInit {
  propertyOwnerId: string = '';
  propertyOwner: updateOwner | undefined;
  updateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private propertyOwnerService: PropertyOwnerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyOwnerId = params['id'];
      this.loadPropertyOwnerDetails(); // Ensure method is called here
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
            // password: ['12aW$ffff', [Validators.required]],
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
          // Handle the error gracefully, e.g., show a message to the user
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
          this.router.navigate(['/login']); // Redirect after success
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  // Deactivate Property Owner with Confirmation
  deactivatePropertyOwner() {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // If token is missing, show an error and exit the function
      console.error('No token found, user is not authenticated');
      alert('You must be logged in to perform this action.');
      return;
    }

    // Ask for confirmation before deactivating
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
              // this.router.navigate(['/repairs']);
              localStorage.setItem('token', token);
            } else {
              console.error(
                'Error: Empty or unsuccessful response during deletion'
              );
            }
          },
          error: (error) => {
            if (error.status === 401) {
              // Token expired or invalid
              alert('Session expired. Please log in again.');
              // this.router.navigate(['/login']);
            } else {
              console.error('Error deleting property owner:', error);
              alert('An error occurred while deleting the property owner');
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
  // deactivatePropertyOwner() {
  //   const confirmDeactivate = confirm(
  //     'Are you sure you want to deactivate this owner?'
  //   );
  //   if (confirmDeactivate) {
  //     const token = localStorage.getItem('token');
  //     this.propertyOwnerService
  //       .deactivatePropertyOwner(this.propertyOwnerId)
  //       .subscribe({
  //         next: (response: any) => {
  //           if (response) {
  //             // Redirect to repairs or show success message
  //             console.log('Deactivation successful', response);
  //             localStorage.setItem('token', token);
  //             // this.router.navigate(['/repairs']);
  //           } else {
  //             // Handle failure case if needed
  //             console.error('Error deactivating property owner');
  //           }
  //         },
  //         error: (error) => {
  //           console.error('Error deactivating property owner:', error);
  //         },
  //         complete: () => {
  //           console.log('Deactivation process completed');
  //         },
  //       });
  //   } else {
  //     alert('Deletion process completed');
  //     console.log('Deactivation cancelled');
  //   }
  // }

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
              // Redirect to repairs or show success message
              console.log('Deletion successful', response);
              // this.router.navigate(['/repairs']);
            } else {
              // Handle failure case if needed
              console.error('Error deleting property owner');
            }
          },
          error: (error) => {
            console.error('Error deleting property owner:', error);
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

  // deactivatePropertyOwner() {
  //   const confirmDeactivate = confirm('Are you sure you want to deactivate this owner?');
  //   if (confirmDeactivate){}
  //   this.propertyOwnerService
  //     .deactivatePropertyOwner(this.propertyOwnerId)
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.router.navigate(['/repairs']);
  //       } else {
  //         // Handle failure case if needed
  //         console.error('Error deleting property owner');
  //       }
  //     });
  // }

  // deletePropertyOwner() {
  //   this.propertyOwnerService
  //     .deletePropertyOwner(this.propertyOwnerId)
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.router.navigate(['/repairs']);
  //       } else {
  //         // Handle failure case if needed
  //         console.error('Error deleting property owner');
  //       }
  //     });
  // }
}
