import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteExistenteComponent } from './cliente-existente.component';

describe('ClienteExistenteComponent', () => {
  let component: ClienteExistenteComponent;
  let fixture: ComponentFixture<ClienteExistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteExistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
