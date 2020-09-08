import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Productos } from './../../models/productos/productos';
import { Categorias } from './../../models/categorias/categorias';
import { TiposPorducto } from './../../models/tiposProducto/tipos-porducto';
import { Marca } from './../../models/marca/marca';
import { ProductosService } from './../../services/productos/productos.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { Inventario } from './../../models/inventario/inventario';
import { InventarioService } from './../../services/inventario/inventario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-productos-inventario',
  templateUrl: './list-productos-inventario.component.html',
  styleUrls: ['./list-productos-inventario.component.css']
})
export class ListProductosInventarioComponent implements OnInit {
 //producto
 columnaProducto: string[] =
 ['id_producto','categoria', 'marca', 'tipo_producto','descripcion','modelo','precio','opciones'];
 listDataProducto : MatTableDataSource<any>;

 @ViewChild('ProductoSort') ProductoSort: MatSort
 @ViewChild('MatPaginatorProducto') ProductoPaginator: MatPaginator

 searchKey:string

 productos: Productos[]
 productoSeleccion: Productos
 inventarioSeleccion: Inventario

 constructor
 (
   private productoService: ProductosService,
   private inventarioService: InventarioService,
   private router:Router,
   private dialog:MatDialog,
   public dialogRef: MatDialogRef<ListProductosInventarioComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any
 )
 {
   //this.productos = new Productos()
   this.productoSeleccion = new Productos()
   this.inventarioSeleccion = new Inventario()
 }


 ngOnInit(): void {
   this.getProductos()
 }

 confirm(objeto){
  this.dialogRef.close(objeto)
 }
 cerrarDialog(){
  this.dialogRef.close()
 }
 addProductoProforma(form?:NgForm){
  this.productoService.obtenerProducto(form.value.id_producto)
  .subscribe(res => { //((res:any) => {
    const data:any = {
      productos:res,
      cantidad:form.value.cantidad
    }
    this.confirm(data)
  });
 }
 onSearchClearProducto(){
   this.searchKey='';
   this.applyFilterProducto()
 }

 applyFilterProducto(){
   this.listDataProducto.filter = this.searchKey.trim().toLowerCase()
 }

 getProductos(){
   this.productoService.listProducto()
     .subscribe(res => {
     this.productos = res as Productos[];
     this.listDataProducto = new MatTableDataSource(this.productos)
     this.listDataProducto.sort = this.ProductoSort;
     this.listDataProducto.paginator = this.ProductoPaginator

   });
 }
 addProducto(productos:Productos){
  this.productoSeleccion = productos
 }
 addInventario(form?:NgForm){
    const datosEnviar:any = {
      id_producto:form.value.id_producto,
      cantidad:form.value.cantidad
    }
    this.inventarioService.postInventario(datosEnviar)
    .subscribe(res => {
      form.reset()
      this.exito('success',res)
      this.cerrarDialog()
    },err=>{
      this.error('error',err.error)
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
