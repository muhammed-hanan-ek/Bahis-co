import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWorkComponent } from './create-edit-work.component';

describe('CreateEditWorkComponent', () => {
  let component: CreateEditWorkComponent;
  let fixture: ComponentFixture<CreateEditWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
