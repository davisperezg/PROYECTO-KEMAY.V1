import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { Productos } from '../../models/productos/productos';
import { Marca } from '../../models/marca/marca';
import { Categorias } from '../../models/categorias/categorias';
import { TiposPorducto } from '../../models/tiposProducto/tipos-porducto';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.css']
})
export class DatosProductoComponent implements OnInit {
  categoriaSeleccion: Categorias
  tipoSeleccion: TiposPorducto
  marcaSeleccion:Marca
  productoSeleccion:Productos
  categorias: Categorias[]
  tipos : TiposPorducto[]
  marca: Marca[]
  productos:Productos[]

  constructor
  (
    private productoService:ProductosService,
    private router:Router,
    public dialogRef: MatDialogRef<DatosProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  )
  {
    this.productoSeleccion = new Productos()
    this.categoriaSeleccion = new Categorias();
    this.tipoSeleccion = new TiposPorducto();
    this.marcaSeleccion = new Marca();
  }

  ngOnInit(): void {
    //this.getProductos()
    //console.log(this.data)
    if(this.data){
      this.getTipoXCategoria(this.data.id_categoria)
      this.getMarcaXTipo(this.data.id_tipo_producto)
      this.productoSeleccion = this.data
    }else{
      console.log('sin data')
    }
    this.getCategoria()
  }
  addProducto(form?:NgForm){
    if(form.value.id_producto){
      this.productoService.putProducto(form.value)
      .subscribe(res => {
        form.reset()
        this.exito('success',res)
        this.cerrarVentana()
      },err=>{
        this.error('error',err)
      });
    }else{
      this.productoService.postProducto(form.value)
      .subscribe(res => {
        form.reset()
        this.exito('success',res)
        this.cerrarVentana()
      },err=>{
        this.error('error',err.error)
      });
    }
  }

  cerrarVentana(){
    this.dialogRef.close()
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
  //mensajes
  exito(tipo, mensaje){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: tipo,
      title: mensaje
    })
  }
  error(tipo, mensaje){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: tipo,
      title: mensaje
    })
  }
}
