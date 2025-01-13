import { Component, NgModule } from '@angular/core';
import { PropertyOwner } from '../../../model/property-owner';
import { PropertyOwnerService, VatAndEmail } from '../../../services/property-owner.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-owner-search',
  standalone: true,
  imports: [FormsModule, NgFor, NavbarComponent, NgIf],
  templateUrl: './property-owner-search.component.html',
  styleUrl: './property-owner-search.component.scss'
})
export class PropertyOwnerSearchComponent {
	searchPerformed = false;
	public allPropertyOwners: PropertyOwner[] = [];
	public propertyOwners: PropertyOwner[] = [];
	public vatSearchInput: string = '';
	public emailSearchInput: string = '';
	
	

	constructor(
			private route: ActivatedRoute,
			private propertyOwnerService: PropertyOwnerService,
			private router: Router
		) { }

	ngOnInit() {
		this.getPropertyOwners();
		
	}

	
	public onServerSearch(): void {
		this.searchPerformed = true;

			// if both search fields are empty we should not search
			if (this.vatSearchInput === "" && this.emailSearchInput === "") {
				return;
			}
		// if they are empty we pass undefined, this way we can easily construct
		// the URL parameters
		const searchParameters: VatAndEmail = {
			vat: this.vatSearchInput !== "" ? this.vatSearchInput : undefined,
			email: this.emailSearchInput !== "" ? this.emailSearchInput : undefined,
		};

		this.propertyOwnerService.getUsersByVatAndEmail(searchParameters).subscribe((response: any) => {
			if (response && response.elements) {
				// the endpoint returns a single object instead of an array
				// (like the /api/PropertyOwners does) of
				// objects so we have to place the data into an array
				const propertyOwnersArray: PropertyOwner[] = response.elements;
				this.propertyOwners = propertyOwnersArray;
				
			} else {
				this.propertyOwners = [];
			}
		});
	}

	// filters the PropertyOwners based on search field values. This expects the
	// Property 
	public onFrontendSearch(): void {

				// if both search fields are empty we should not search
				if (this.vatSearchInput === "" && this.emailSearchInput === "") {
					return;
				}
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
