import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensajeComponent } from './dialog-mensaje.component';

describe('DialogMensajeComponent', () => {
  let component: DialogMensajeComponent;
  let fixture: ComponentFixture<DialogMensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
