import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClienteInstaRegistradoComponent } from './dialog-cliente-insta-registrado.component';

describe('DialogClienteInstaRegistradoComponent', () => {
  let component: DialogClienteInstaRegistradoComponent;
  let fixture: ComponentFixture<DialogClienteInstaRegistradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogClienteInstaRegistradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClienteInstaRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
