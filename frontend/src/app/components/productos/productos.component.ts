import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProductosService } from './../../services/productos/productos.service';
import { Router } from '@angular/router';
import { Productos } from '../../models/productos/productos'
import { Categorias } from '../../models/categorias/categorias'
import { TiposPorducto } from '../../models/tiposProducto/tipos-porducto'
import { Marca } from '../../models/marca/marca'
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DatosProductoComponent } from '../datos-producto/datos-producto.component';
import { DialogConfirmacionComponent } from "../dialog-confirmacion/dialog-confirmacion.component";
import { DialogMensajeComponent } from './../dialog-mensaje/dialog-mensaje.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
declare var $:any;
declare var JQuery:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})

export class ProductosComponent implements OnInit {

  prueba:string[] = []
  arrebatao:string[] = []
  //categoria
  columnaCategoria: string[] = ['nombre', 'opciones'];
  listDataCategoria : MatTableDataSource<any>;

  //tipo
  columnaTipo: string[] = ['categoria', 'nombre', 'opciones'];
  listDataTipo : MatTableDataSource<any>;

  //marca
  columnaMarca: string[] = ['tipo_producto', 'nombre', 'opciones'];
  listDataMarca : MatTableDataSource<any>;

  //producto
  columnaProducto: string[] =
  ['id_producto','categoria', 'marca', 'tipo_producto','descripcion','modelo','precio','opciones'];
  listDataProducto : MatTableDataSource<any>;

  @ViewChild('sBSort') sBSort: MatSort
  @ViewChild('MatPaginatorCategoria') CategoriaPaginator: MatPaginator

  @ViewChild('TipoSort') TipoSort: MatSort
  @ViewChild('MatPaginatorTipo') TipoPaginator: MatPaginator

  @ViewChild('MarcaSort') MarcaSort: MatSort
  @ViewChild('MatPaginatorMarca') MarcaPaginator: MatPaginator

  @ViewChild('ProductoSort') ProductoSort: MatSort
  @ViewChild('MatPaginatorProducto') ProductoPaginator: MatPaginator

  searchKey:string
  productosPDF:Productos[]
  productos: Productos[]
  categorias: Categorias[]
  productoSeleccion: Productos
  categoriaSeleccion: Categorias
  tipoSeleccion: TiposPorducto
  marcaSeleccion: Marca
  tipos : TiposPorducto[]
  marca: Marca[]
  dataCategoria = ''
  date: Date = new Date()

  constructor
  (
    private productoService: ProductosService,
    private router:Router,
    private dialog:MatDialog,

  )
  {
    //this.productos = new Productos()
    this.categoriaSeleccion = new Categorias();
    this.tipoSeleccion = new TiposPorducto();
    this.marcaSeleccion = new Marca();
    this.productoSeleccion = new Productos()

  }


  ngOnInit(): void {
    this.getProductos()
    this.getCategoria()
    this.getTipo()
    this.getMarca()
  }
  getproductos(){
    var data = [];
    var mainData =this.productos;
    for (var i = 0 ; i < mainData.length; i++) {
      data.push([
        mainData[i].categoria,
        mainData[i].marca,
        mainData[i].tipo_producto,
        mainData[i].descripcion,
        mainData[i].modelo,
        mainData[i].precio
      ])
    }
    return data;
  }
  generarPDF(){
    const doc = new jsPDF()
    doc.text('KEMAY TECHNOLOGY',10,10)
    doc.text('Lista de Precios : '+this.date.getFullYear() ,10,20)
    const columns   = ['CATEGORÍA','MARCA','TIPO','PRODUCTO','MODELO','PRECIO']
    var data:any = this.getproductos()
    doc.autoTable(columns,data,
      { margin:{ top: 25  , left:10}}
    );
    doc.save('ListaPrecios.pdf')
  }
  abrirNuevoProducto(){
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    const dialogRef = this.dialog.open(DatosProductoComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result =>{
      this.getProductos()
    })
  }
  moreDetails(row){
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height = "50%"
    dialogConfig.data = row
    const dialogRef = this.dialog.open(DialogMensajeComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result =>{
      //this.getProductos()
    })
  }
  editProducto(productos:Productos){
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = productos
    const dialogRef = this.dialog.open(DatosProductoComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result =>{
      this.getProductos()
    })
  }

  deleteProducto($id){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
          this.productoService.deleteProducto($id)
          .subscribe(res => {
            this.getProductos()
            this.exito('success',res)
          }, err =>{
            this.error('error',err.error)
          });
      }
    });
  }

  resetFormCategoria(form?: NgForm){
    if(form.value.id_categoria){
      form.reset();
      this.getCategoria();
    //  this.rerenderCategoria()
    }else{
      form.reset();
    }
  }
  //reset tipo
  resetFormTipo(form?: NgForm){
    if(form.value.id_tipo_producto){
      form.reset();
      this.getTipo();
    //  this.rerenderTipo()
    }else{
      form.reset();
    }
  }
  //reset marca
  resetFormMarca(form?: NgForm){
    if(form.value.id_marca){
      form.reset();
      this.getMarca();
     // this.rerenderMarca()
    }else{
      form.reset();
    }
  }
  //reset producto
  resetFormProducto(form?: NgForm){
    if(form.value.id_marca){
      form.reset();
      this.getProductos();
    // this.rerenderMarca()
    }else{
      form.reset();
    }
  }
  onSearchClear(){
    this.searchKey='';
    this.applyFilterCategoria()
  }
  onSearchClearTipo(){
    this.searchKey='';
    this.applyFilterCategoria()
  }
  onSearchClearMarca(){
    this.searchKey='';
    this.applyFilterCategoria()
  }
  onSearchClearProducto(){
    this.searchKey='';
    this.applyFilterProducto()
  }
  applyFilterCategoria(){
    this.listDataCategoria.filter = this.searchKey.trim().toLowerCase()
  }
  applyFilterMarca(){
    this.listDataMarca.filter = this.searchKey.trim().toLowerCase()
  }
  applyFilterTipo(){
    this.listDataTipo.filter = this.searchKey.trim().toLowerCase()
  }
  applyFilterProducto(){
    this.listDataProducto.filter = this.searchKey.trim().toLowerCase()
  }
  /**
   *  muestraOpciones(){
    this.getCategoria()
    this.getTipo()
    this.getMarca()
    if($("#opciones").text() === "Abrir opciones"){
      $("#opciones").text("Cerrar Pestañas")
      $("#ul-opciones").show();
      $("#myTabContent").show();
    }
    else{
      $("#opciones").text("Abrir opciones")
      $("#ul-opciones").hide();
      $("#myTabContent").hide();
    }
  }
   */

  getProductos(){
    this.productoService.listProducto()
      .subscribe(res => {
      this.productos = res as Productos[];
      this.listDataProducto = new MatTableDataSource(this.productos)
      this.listDataProducto.sort = this.ProductoSort;
      this.listDataProducto.paginator = this.ProductoPaginator

    });
  }
  getTipo(){
    this.productoService.listTipo()
    .subscribe(res => {
      this.tipos = res as TiposPorducto[];
      this.listDataTipo = new MatTableDataSource(this.tipos)
      this.listDataTipo.sort = this.TipoSort;
      this.listDataTipo.paginator = this.TipoPaginator

    });
  }
  getMarca(){
    this.productoService.listMarca()
    .subscribe(res => {
      this.marca = res as Marca[];
      this.listDataMarca = new MatTableDataSource(this.marca)
      this.listDataMarca.sort = this.MarcaSort;
      this.listDataMarca.paginator = this.MarcaPaginator
    });
  }
  getCategoria(){
    this.productoService.listCategoria()
      .subscribe(res => {
      this.categorias = res as Categorias[];
      this.listDataCategoria = new MatTableDataSource(this.categorias)
      this.listDataCategoria.sort = this.sBSort;
      this.listDataCategoria.paginator = this.CategoriaPaginator

    });
  }
  //categoria
  addCategoria(form?: NgForm){
    if(form.value.id_categoria){
      this.productoService.putCategoria(form.value)
      .subscribe(res => {
        form.reset()
        this.getCategoria()
        this.getTipo()
        this.getProductos()
        this.exito('success',res)
      },err=>{
        this.error('error',err)
      });
    }else{
      this.productoService.postCategoria(form.value)
      .subscribe(res => {
        form.reset()
        this.getCategoria()
        this.exito('success',res)
      },err=>{
        this.error('error',err.error)
      });
    }
  }
  deleteCategoria($id, form?: NgForm ){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        if(form.value.id_categoria){
          this.productoService.deleteCategoria($id)
          .subscribe(res => {
            form.reset();
            this.getCategoria()
            this.exito('success',res)
          },err => {
            this.error('error',err.error)
          });
         }else{
          this.productoService.deleteCategoria($id)
          .subscribe(res => {
            this.getCategoria()
            this.exito('success',res)
          }, err =>{
            this.error('error',err.error)
          });
         }
      }
    });
  }
  editCategoria(categoria: Categorias){
    this.categoriaSeleccion = categoria;
  };
  //tipo
  addTipo(form?: NgForm){
    if(form.value.id_tipo_producto){
      this.productoService.putTipo(form.value)
      .subscribe(res => {
        form.reset()
        this.getTipo()
        this.getMarca()
        this.getProductos()
        this.exito('success',res)
      },err=>{
        this.error('error',err)
      });
    }else{
      this.productoService.postTipo(form.value)
      .subscribe(res => {
        form.reset()
        this.getTipo()
        this.exito('success',res)
      },err=>{
        this.error('error',err.error)
      });
    }
  }
  deleteTipo($id, form?: NgForm ){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        if(form.value.id_tipo_producto){
          this.productoService.deleteTipo($id)
          .subscribe(res => {
            form.reset();
            this.getTipo();
            this.exito('success',res)
          },err => {
            this.error('error',err.error)
          });
         }else{
          this.productoService.deleteTipo($id)
          .subscribe(res => {
            this.getTipo();
            this.exito('success',res)
          },err => {
            this.error('error',err.error)
          });
         }
      }
    });
  }
  editTipo(tipo: TiposPorducto){
    this.tipoSeleccion = tipo;
  };
  //obtenemos el valor text del select
  onChange(event) {
    this.dataCategoria = event.target.options[event.target.options.selectedIndex].text;
  }
  //marca
  addMarca(form?: NgForm){
    if(form.value.id_marca){
      this.productoService.putMarca(form.value)
      .subscribe(res => {
        form.reset()
        this.getMarca()
        this.getProductos()
        this.exito('success',res)
      },err=>{
        this.error('error',err)
      });
    }else{
      this.productoService.postMarca(form.value)
      .subscribe(res => {
        form.reset()
        this.getMarca()
        this.exito('success',res)
      },err=>{
        this.error('error',err.error)
      });
    }
  }
  deleteMarca(id_marca: string, form?: NgForm ){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        if(form.value.id_marca){
          this.productoService.deleteMarca(id_marca)
          .subscribe(res => {
            form.reset();
            this.getMarca()
            this.exito('success',res)
          },err=>{
            this.error('error',err.error)
          });
         }else{
          this.productoService.deleteMarca(id_marca)
          .subscribe(res => {
            this.getMarca()
            this.exito('success',res)
          },err=>{
            this.error('error',err.error)
          });
         }
      }
    });
  }
  editMarca(marca: Marca){
    this.marcaSeleccion = marca;
  };
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
