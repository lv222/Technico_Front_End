import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerDetailsComponent } from './property-owner-details.component';

describe('PropertyOwnerDetailsComponent', () => {
  let component: PropertyOwnerDetailsComponent;
  let fixture: ComponentFixture<PropertyOwnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
