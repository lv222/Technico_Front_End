import { Component } from '@angular/core';
import { PropertyOwner } from '../../../model/property-owner';
import { PropertyOwnerService } from '../../../services/property-owner.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { PropertyItemService } from '../../../services/property-item.service';
import { PropertyItem } from '../../../model/property-item';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-properties-and-properties-owners',
  standalone: true,
  imports: [NavbarComponent, RouterModule, NgFor, FooterComponent],
  templateUrl: './properties-and-property-owners.component.html',
  styleUrl: './properties-and-properties-owners.component.scss',
})
export class PropertiesAndPropertyOwnersComponent {
  public propertyOwners: PropertyOwner[] = [];
  public propertyItems: PropertyItem[] = [];
  public vatSearchInput: string = '';
  public emailSearchInput: string = '';
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 1;

  constructor(
    private propertyOwnerService: PropertyOwnerService,
    private propertyItemService: PropertyItemService
  ) {}

  ngOnInit() {
    this.getPropertyOwners();
    this.getPropertyItems();
  }

  public resetSearchResult(): void {
    this.vatSearchInput = '';
    this.emailSearchInput = '';
    this.propertyOwners = [];
    this.propertyItems = [];
  }
  private getPropertyItems() {
    this.propertyItemService
      .getProperties(this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        if (response && response.elements) {
          this.propertyItems = response.elements;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        } else {
          this.propertyItems = [];
        }
      });
  }
  private getPropertyOwners() {
    this.propertyOwnerService.getUsers().subscribe((response: any) => {
      if (response && response.elements) {
        this.propertyOwners = response.elements;
      } else {
        this.propertyOwners = [];
      }
    });
  }
  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPropertyItems();
    }
  }

  public previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPropertyItems();
    }
  }
}
