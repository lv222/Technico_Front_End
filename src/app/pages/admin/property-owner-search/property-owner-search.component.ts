import { Component, NgModule } from '@angular/core';
import { PropertyOwner } from '../../../model/property-owner';
import {
  PropertyOwnerService,
  VatAndEmail,
} from '../../../services/property-owner.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-property-owner-search',
  standalone: true,
  imports: [FormsModule, NgFor, NavbarComponent, NgIf, FooterComponent],
  templateUrl: './property-owner-search.component.html',
  styleUrl: './property-owner-search.component.scss',
})
export class PropertyOwnerSearchComponent {
  searchPerformed = false;
  allPropertyOwners: PropertyOwner[] = [];
  propertyOwners: PropertyOwner[] = [];
  vatSearchInput: string = '';
  emailSearchInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyOwnerService: PropertyOwnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPropertyOwners();
  }

  public onServerSearch(): void {
    this.searchPerformed = true;

    // if both search fields are empty we should not search
    if (this.vatSearchInput === '' && this.emailSearchInput === '') {
      return;
    }
    // if they are empty we pass undefined, this way we can easily construct
    // the URL parameters
    const searchParameters: VatAndEmail = {
      vat: this.vatSearchInput !== '' ? this.vatSearchInput : undefined,
      email: this.emailSearchInput !== '' ? this.emailSearchInput : undefined,
    };

    this.propertyOwnerService
      .getUsersByVatAndEmail(searchParameters)
      .subscribe((response: any) => {
        if (response && response.elements) {
          const propertyOwnersArray: PropertyOwner[] = response.elements;
          this.propertyOwners = propertyOwnersArray;
        } else {
          this.propertyOwners = [];
        }
      });
  }

  public resetSearchResult(): void {
    this.vatSearchInput = '';
    this.emailSearchInput = '';
    this.propertyOwners = [];
    this.searchPerformed = false;
  }

  private getPropertyOwners() {
    this.propertyOwnerService.getUsers().subscribe((response: any) => {
      if (response && response.elements) {
        this.allPropertyOwners = response.elements;
      } else {
        this.allPropertyOwners = [];
      }
    });
  }
}
