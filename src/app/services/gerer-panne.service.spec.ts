import { TestBed } from '@angular/core/testing';

import { GererPanneService } from './gerer-panne.service';

describe('GererPanneService', () => {
  let service: GererPanneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererPanneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
