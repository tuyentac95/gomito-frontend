import { TestBed } from '@angular/core/testing';

import { ListListService } from './list-list.service';

describe('ListListService', () => {
  let service: ListListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
