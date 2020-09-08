import { Component, OnInit } from '@angular/core';
import { Categorias } from './../../../models/categorias/categorias';
import { TiposPorducto } from './../../../models/tiposProducto/tipos-porducto';
import { Marca } from './../../../models/marca/marca';
import { ProductosService } from './../../../services/productos/productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Productos } from './../../../models/productos/productos';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  categorias: Categorias[]
  tipos : TiposPorducto[]
  marca: Marca[]
  productos:Productos[]
  detalle:string
  constructor(
    private productoService:ProductosService,
  ) { }

  ngOnInit(): void {
    this.getCategoria()

  }
  getCategoria(){
    this.productoService.listCategoria()
      .subscribe(res => {
      this.categorias = res as Categorias[];
    });
  }

  getTipoXCategoria(idCategoria){
    this.productoService.listTipoXCategoria(idCategoria)
    .subscribe(res => {
      this.tipos = res as TiposPorducto[]
    });
  }

  getMarcaXTipo(idCategoria){
    this.productoService.listMarcaXTipo(idCategoria)
    .subscribe(res => {
      this.marca = res as Marca[];
    });
  }

  getProductos(idMarca){
    this.productoService.listProductoXcategoriaXtipoXmarca(idMarca)
      .subscribe(res => {
      this.productos = res as Productos[];
    });
  }
  getDetalle(idProducto){
    this.productoService.obtenerProducto(idProducto)
      .subscribe((res:any) => {
      const data = res;
      this.detalle = data[0].detalle
    });
  }
}
