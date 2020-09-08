import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dialogPDF } from './dialogPDF.component';

describe('dialogPDF', () => {
  let component: dialogPDF;
  let fixture: ComponentFixture<dialogPDF>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dialogPDF ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dialogPDF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
