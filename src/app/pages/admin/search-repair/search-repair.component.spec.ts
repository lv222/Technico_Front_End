import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRepairComponent } from './search-repair.component';

describe('SearchRepairComponent', () => {
  let component: SearchRepairComponent;
  let fixture: ComponentFixture<SearchRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRepairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
