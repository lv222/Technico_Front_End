import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { RepairsService } from '../../../services/repairs.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-create-repair',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './create-repair.component.html',
  styleUrl: './create-repair.component.scss'
})
export class CreateRepairComponent implements OnInit {
  // register: any;
  // response: any;
  message = '';
  repairRegisterForm!: FormGroup;

constructor(private service: RepairsService, private router: Router, private fb: FormBuilder) {}


ngOnInit() {
  this.repairRegisterForm = this.fb.group({
    propertyItemId: [
      '',
      // [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(50),
      //   Validators.pattern('^[a-zA-Z ]+$'), // Allow only letters and spaces
      // ],
    ],
 
    address: [
      '',
      // [
      //   Validators.required,
      //   Validators.minLength(5),
      //   Validators.maxLength(100),
      // ],
      ],
      repairDate: [
        '',
        // [
        //   Validators.required,
          
        // ],
        ],
        repairType: [
      '',
      // [
      //   Validators.required,
        
      // ],
    ],
    cost: [
      '',
      [
        Validators.required,
       
      ],
    ],
    vat: [
      '',
      // [
      //   Validators.required,
      //   Validators.minLength(9),
      //   Validators.maxLength(9),
      //   Validators.pattern('^[0-9]+$'), // Ensure VAT is numeric
      // ],
    ],
  });
}

public onSubmit() {

  if (this.repairRegisterForm.valid) {
    // Format repairDate to ISO string
    const repairDateValue = this.repairRegisterForm.value.repairDate;

    if (repairDateValue) {
      this.repairRegisterForm.patchValue({
        repairDate: new Date(repairDateValue).toISOString()
      });
    }
  this.service.createRepair(this.repairRegisterForm.value)
  .subscribe({
    next: (data: any) => {
      console.log(this.repairRegisterForm.value);
      console.log('Repair created:', data);
      
      this.router.navigate(['/repairs']);
    },
    error: (err) => {
      
      console.error('Validation errors:', err);
    }
  });
  // if (this.repairRegisterForm.valid) {
  //   console.log(this.repairRegisterForm.value);
    
  //   this.service.createRepair(this.repairRegisterForm.value)
  //     .subscribe({
  //       next: (data: any) => {
  //         console.log(data);
  //         this.router.navigate(['/login']);
  //       },
  //       error: (err) => console.log(err)
  //     });
  // }
}
}

}

