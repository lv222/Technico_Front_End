import { Component, NgModule } from '@angular/core';
import { PropertyOwner } from '../../../model/property-owner';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-property-owner-search',
  standalone: true,
  imports: [FormsModule, NgFor, NavbarComponent],
  templateUrl: './property-owner-search.component.html',
  styleUrl: './property-owner-search.component.scss'
})
export class PropertyOwnerSearchComponent {
	public allPropertyOwners: PropertyOwner[] = [];
	public propertyOwners: PropertyOwner[] = [];
	public vatSearchInput: string = '';
	public emailSearchInput: string = '';

	constructor(private propertyOwnerService: PropertyOwnerService) { }

	ngOnInit(): void {
		this.getPropertyOwners();
	}

	// fetches the PropertyOwners based on search field values
	public onServerSearch(): void {
		this.propertyOwnerService.getUsersByVatAndEmail(this.vatSearchInput).subscribe((response: any) => {
			if (response) {
				// the endpoint returns a single object instead of an array
				// (like the /api/PropertyOwners does) of
				// objects so we have to place the data into an array
				const propertyOwnersArray: PropertyOwner[] = [response];
				this.propertyOwners = propertyOwnersArray;
			} else {
				this.propertyOwners = [];
			}
		});
	}

	// filters the PropertyOwners based on search field values. This expects the
	// Property 
	public onFrontendSearch(): void {
		// we initiate an empty array to place the filtering results
		let filteredPropertyOwners: PropertyOwner[] = [];

		// we loop through each element in this.allPropertyOwners and perform
		// the function propertyOwner => {} to each element.
		//
		// that is the array containing all property owners, but they are never
		// displayed directly from that.
		//
		// In this function we check the search condition and if true, we push
		// the element to filteredPropertyOwners.
		this.allPropertyOwners.forEach(propertyOwner => {
			// if one of the search conditions is true, this element should be 
			// displayed
			if (propertyOwner.vat.includes(this.emailSearchInput) || propertyOwner.vat.includes(this.emailSearchInput)) {
				filteredPropertyOwners.push(propertyOwner);
			}
		});

		this.propertyOwners = filteredPropertyOwners;
	}

	public resetSearchResult(): void {
		this.vatSearchInput = "";
		this.emailSearchInput = "";
		this.propertyOwners = [];
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
