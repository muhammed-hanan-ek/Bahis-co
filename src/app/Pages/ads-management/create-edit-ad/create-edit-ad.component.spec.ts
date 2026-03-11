import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAdComponent } from './create-edit-ad.component';

describe('CreateEditAdComponent', () => {
  let component: CreateEditAdComponent;
  let fixture: ComponentFixture<CreateEditAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
