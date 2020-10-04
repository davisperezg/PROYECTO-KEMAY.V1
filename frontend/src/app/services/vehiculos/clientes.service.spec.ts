import { TestBed } from '@angular/core/testing';

import { ClientesVehiculoService } from './clientes.service';

describe('ClientesVehiculoService', () => {
  let service: ClientesVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
