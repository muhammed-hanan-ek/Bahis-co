import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditConversionComponent } from './create-edit-conversion.component';

describe('CreateEditConversionComponent', () => {
  let component: CreateEditConversionComponent;
  let fixture: ComponentFixture<CreateEditConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditConversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
