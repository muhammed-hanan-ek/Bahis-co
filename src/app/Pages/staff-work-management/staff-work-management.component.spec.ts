import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffWorkManagementComponent } from './staff-work-management.component';

describe('StaffWorkManagementComponent', () => {
  let component: StaffWorkManagementComponent;
  let fixture: ComponentFixture<StaffWorkManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffWorkManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffWorkManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
