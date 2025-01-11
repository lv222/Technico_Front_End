import { Component, Injectable, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RepairsService } from '../../services/repairs.service';
import { NgFor, NgIf } from '@angular/common';
import { Repair } from '../../model/repair';
import { PropertyOwnerService } from '../../services/property-owner.service';
import { PropertyOwner } from '../../model/property-owner';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {

  propertyowner?: PropertyOwner[];

  constructor(private service:PropertyOwnerService) {}

  ngOnInit(): void {
    this.getUsers();
    
  }

  private getUsers() {
    this.service.getUsers().subscribe((response: any) => {
      if (response && response.elements) {
        this.propertyowner = response.elements;
      } else {
        this.propertyowner = [];
      }
      console.log(this.propertyowner);
    });
  }

  }

  

