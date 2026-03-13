import { TestBed } from '@angular/core/testing';

import { BACService } from './bac.service';

describe('BACService', () => {
  let service: BACService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BACService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
