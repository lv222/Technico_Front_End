import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { RepairsService } from '../../../services/repairs.service';
import { NgFor, NgIf } from '@angular/common';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-create-repair',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './create-repair.component.html',
  styleUrl: './create-repair.component.scss',
})
export class CreateRepairComponent implements OnInit {
  minDateTime: string = '';
  repairRegisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: RepairsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMinDateTime();
    this.repairRegisterForm = this.fb.group({
      propertyItemId: ['', [Validators.required]], // Add validation if needed
      address: ['', [Validators.required, Validators.minLength(5)]], // Sample address validation
      repairDate: ['', [Validators.required]],
      repairType: ['Painting', [Validators.required]],
      description: ['', Validators.required],
      cost: ['', [Validators.required]], // Cost cannot be negative
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
  get formValues() {
    return {
      propertyItemId: this.repairRegisterForm.get('propertyItemId'),
      repairDate: this.repairRegisterForm.get('repairDate'),
      vat: this.repairRegisterForm.get('vat'),
      repairType: this.repairRegisterForm.get('repairType'),
      address: this.repairRegisterForm.get('address'),
      description: this.repairRegisterForm.get('description'),
      cost: this.repairRegisterForm.get('cost'),
    };
  }

  setMinDateTime(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Format as YYYY-MM-DDTHH:mm
    this.minDateTime = `${year}-${month}-${date}T${hours}:${minutes}`;
  }

  public onSubmit(): void {
    console.log('Is form valid?', this.repairRegisterForm.valid);
    if (this.repairRegisterForm.valid) {
      const repairDateValue = this.repairRegisterForm.value.repairDate;
      if (repairDateValue) {
        const parsedDate = new Date(repairDateValue);
        if (!isNaN(parsedDate.getTime())) {
          this.repairRegisterForm.patchValue({
            repairDate: parsedDate.toISOString(),
          });
        } else {
          console.error('Invalid repairDateValue:', repairDateValue);
          alert(
            'The repair date provided is invalid. Please use a valid date format.'
          );
          return;
        }
      }

      this.service.createRepair(this.repairRegisterForm.value).subscribe({
        next: (data: any) => {
          console.log('Repair created:', data);
          this.router.navigate(['/repairs']);
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
        },
      });
    }
  }
}
