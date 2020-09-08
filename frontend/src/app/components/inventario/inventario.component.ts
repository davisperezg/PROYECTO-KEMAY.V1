import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Inventario } from '../../models/inventario/inventario';
import { InventarioHistorial } from '../../models/InventarioHistorial/inventario-historial';

import { InventarioService } from '../../services/inventario/inventario.service'
import Swal from 'sweetalert2'
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ListProductosInventarioComponent } from './../list-productos-inventario/list-productos-inventario.component';
import { DialogConfirmacionComponent } from "../dialog-confirmacion/dialog-confirmacion.component";
import { NgForm } from '@angular/forms';
import { InventarioHistorialComponent } from './../inventario-historial/inventario-historial.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  //fecha meses
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  //producto
  columnaInventario: string[] =
  ['producto', 'cantidad', 'precio','opciones'];
  listDataInventario : MatTableDataSource<any>;

  @ViewChild('InventarioSort') InventarioSort: MatSort
  @ViewChild('MatPaginatoInventario') InventarioPaginator: MatPaginator

  searchKey:string

  inventario: Inventario[]
  inventarioSeleccion: Inventario
  inventarioHistorial:InventarioHistorial[]
  productoSeleccion:''
  date: Date = new Date()
  constructor
  (
    private inventarioService: InventarioService,
    private dialog:MatDialog,
  )
  {
    this.inventarioSeleccion = new Inventario()
    this.productoSeleccion = ''

  }

  descripcion = '';
  cantidadaSolicitada:string
  UltimaFecha:''

  ngOnInit(): void {
    this.getInventario()
  }
  getInventarioPDF(){

    var data = [];
    var mainData =this.inventario;
    for (var i = 0 ; i < mainData.length; i++) {
      data.push([
        mainData[i].producto,
        mainData[i].cantidad,
        mainData[i].precio
      ])
    }
    return data;
  }
  dateFormat1(d) {
    var t = new Date(d);
    //return t.getDate() + ' ' + this.monthNames[t.getMonth()] + ', ' + t.getFullYear();
    return this.monthNames[t.getMonth()];
  }

  generarPDF(){
    //obtener el mes
    const MES = this.dateFormat1(new Date)
    const doc = new jsPDF()
    doc.text('KEMAY TECHNOLOGY',10,10)
    doc.text('Inventario de: '+MES ,10,20)
    const columns   = ['PRODUCTO','CANTIDAD','PRECIO']
    var data:any = this.getInventarioPDF()
    doc.autoTable(columns,data,
      { margin:{ top: 25  , left:10}}
    );
    doc.save('ListaInventario.pdf')
  }

  onSearchClearInventario(){
    this.searchKey='';
    this.applyFilterInventario()
  }

  editPrecio(row){
    //llevar data
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = row
    const dialogRef = this.dialog.open(InventarioHistorialComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result =>{
      this.getInventario()
    })
  }

  deleteInventario(row){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.inventarioService.deleteInventario(row)
        .subscribe(res => {
        this.getInventario()
        this.exito('success',res)
        },err=>{
           this.error('error',err.error)
        });
      }
    });
  }
  applyFilterInventario(){
    this.listDataInventario.filter = this.searchKey.trim().toLowerCase()
  }
  abrirNuevoProducto(){
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "100%"
    dialogConfig.height = "90%"
    const dialogRef = this.dialog.open(ListProductosInventarioComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result =>{
      this.getInventario()
    })
  }
  getInventario(){
    this.inventarioService.listInventario()
      .subscribe(res => {
      this.inventario = res as Inventario[];
      this.listDataInventario = new MatTableDataSource(this.inventario)
      this.listDataInventario.sort = this.InventarioSort;
      this.listDataInventario.paginator = this.InventarioPaginator

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
