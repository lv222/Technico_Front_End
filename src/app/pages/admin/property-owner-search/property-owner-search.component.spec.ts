import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerSearchComponent } from './property-owner-search.component';

describe('PropertyOwnerSearchComponent', () => {
  let component: PropertyOwnerSearchComponent;
  let fixture: ComponentFixture<PropertyOwnerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyOwnerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
