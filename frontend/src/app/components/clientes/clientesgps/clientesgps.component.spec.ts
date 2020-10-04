import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesgpsComponent } from './clientesgps.component';

describe('ClientesgpsComponent', () => {
  let component: ClientesgpsComponent;
  let fixture: ComponentFixture<ClientesgpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesgpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesgpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
