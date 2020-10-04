import { TestBed } from '@angular/core/testing';

import { ClientesInsGpsService } from './clientes-ins-gps.service';

describe('ClientesInsGpsService', () => {
  let service: ClientesInsGpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesInsGpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
