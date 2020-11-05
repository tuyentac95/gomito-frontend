import { TestBed } from '@angular/core/testing';

import { ListBoardService } from './list-board.service';

describe('ListBoardService', () => {
  let service: ListBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
