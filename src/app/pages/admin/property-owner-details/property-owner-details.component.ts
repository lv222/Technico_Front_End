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
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   this.router.navigate(['/login']); // redirect to login if no token
    // }
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

  deletePropertyOwner() {
    this.propertyOwnerService
      .deletePropertyOwnerByVat(this.propertyOwnerId)
      .subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/repairs']);
        } else {
          // Handle failure case if needed
          console.error('Error deleting property owner');
        }
      });
  }
}
