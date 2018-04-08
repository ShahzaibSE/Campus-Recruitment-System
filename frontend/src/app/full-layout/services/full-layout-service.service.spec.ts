import { TestBed, inject } from '@angular/core/testing';

import { FullLayoutServiceService } from './full-layout-service.service';

describe('FullLayoutServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullLayoutServiceService]
    });
  });

  it('should be created', inject([FullLayoutServiceService], (service: FullLayoutServiceService) => {
    expect(service).toBeTruthy();
  }));
});
