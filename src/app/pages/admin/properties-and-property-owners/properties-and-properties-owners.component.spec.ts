import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesAndPropertyOwnersComponent } from './properties-and-property-owners.component';

describe('PropertiesAndPropertiesOwnersComponent', () => {
  let component: PropertiesAndPropertyOwnersComponent;
  let fixture: ComponentFixture<PropertiesAndPropertyOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesAndPropertyOwnersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesAndPropertyOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
