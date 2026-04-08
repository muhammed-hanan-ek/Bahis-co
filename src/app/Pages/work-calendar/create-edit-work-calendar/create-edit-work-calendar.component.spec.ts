import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWorkCalendarComponent } from './create-edit-work-calendar.component';

describe('CreateEditWorkCalendarComponent', () => {
  let component: CreateEditWorkCalendarComponent;
  let fixture: ComponentFixture<CreateEditWorkCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditWorkCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWorkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
