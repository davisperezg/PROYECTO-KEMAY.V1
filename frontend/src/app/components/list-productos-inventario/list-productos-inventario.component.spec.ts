import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosInventarioComponent } from './list-productos-inventario.component';

describe('ListProductosInventarioComponent', () => {
  let component: ListProductosInventarioComponent;
  let fixture: ComponentFixture<ListProductosInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductosInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
