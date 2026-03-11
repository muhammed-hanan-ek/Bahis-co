import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdComponent } from './view-ad.component';

describe('ViewAdComponent', () => {
  let component: ViewAdComponent;
  let fixture: ComponentFixture<ViewAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
