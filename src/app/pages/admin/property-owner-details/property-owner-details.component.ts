import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-property-owner-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './property-owner-details.component.html',
  styleUrl: './property-owner-details.component.scss'
})
export class PropertyOwnerDetailsComponent implements OnInit {
	propertyOwnerId: string = '';

	constructor(
		private route: ActivatedRoute,
		private propertyOwnerService: PropertyOwnerService,
		private router: Router
	) { }

	ngOnInit() {
		// Get ID from the current route
		this.route.params.subscribe(params => {
			this.propertyOwnerId = params['id'];
			// Use this ID to load property owner details
			this.loadPropertyOwnerDetails();
		});
	}

	deletePropertyOwner() {
		this.propertyOwnerService.deletePropertyOwnerByVat(this.propertyOwnerId).subscribe((response: any) => {
			if (response) {
				this.router.navigate(['/login']);
			} else {

			}
		});

	}

	private loadPropertyOwnerDetails() {
		// Add your logic here to load property owner details using the ID
		console.log('Loading details for property owner:', this.propertyOwnerId);
	}
}
