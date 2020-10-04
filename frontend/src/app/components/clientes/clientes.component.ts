import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ClientesService } from './../../services/clientes/clientes.service';

import { Clientes } from './../../models/clientes/clientes';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from './../dialog-confirmacion/dialog-confirmacion.component';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { ClientesConsultado } from './../../models/clientes/clientes-consultado';
declare var M:any;
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  valorConsulta:string
  estadoEmpresa:string;
  searchKey:string

  columnaCliente: string[] =
  ['cliente', 'tipo_documento', 'numero_documento','direccion','telefono','celular','opciones'];
  listDataCliente : MatTableDataSource<any>;

  @ViewChild('ClienteSort') ClienteSort: MatSort
  @ViewChild('MatPaginatorCliente') ClientePaginator: MatPaginator

  clientes:Clientes[]
  clienteSeleccion: Clientes
  constructor
  (
    public dialogo: MatDialogRef<ClientesComponent>,
    private clienteService: ClientesService,

    private dialog:MatDialog
  )
  {
    this.clienteSeleccion = new Clientes()
  }

  ngOnInit(): void {
    this.getClientes()
  }

  checkCliente(cliente: Clientes){
    this.clienteSeleccion = cliente
    this.confirmado()
  }
  applyFilterCliente(){
    this.listDataCliente.filter = this.searchKey.trim().toLowerCase()
  }
  onSearchClearCliente(){
    this.searchKey='';
    this.applyFilterCliente()
  }
  getClientes(){
    this.clienteService.listCliente()
      .subscribe(res => {
      this.clientes = res as Clientes[];
      this.listDataCliente = new MatTableDataSource(this.clientes)
      this.listDataCliente.sort = this.ClienteSort;
      this.listDataCliente.paginator = this.ClientePaginator
    });
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(this.clienteSeleccion);
  }
  deleteCliente(Cliente){
    this.dialog
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
          this.clienteService.deleteCliente(Cliente.id_clientes)
          .subscribe(res => {
            this.getClientes()
            this.exito('success',res)
          }, err =>{
            this.error('error',err.error)
          });
      }
    });
  }
  addCliente(form?: NgForm){
    console.log(form.value.nombres)
    console.log(form.value)
      this.clienteService.postCliente(form.value)
      .subscribe(res => {
        form.reset()
        this.getClientes()
        this.exito('success',res)
        this.estadoEmpresa = ''
      },err=>{
        this.error('error',err.error)
      });
  }
  consultDni(form?: NgForm){
    if(form.value.tipo_documento == undefined || form.value.tipo_documento == null || form.value.tipo_documento.length <= 0){
      return this.error('error','Tipo de Documento sin seleccionar')
    }
    if(form.value.tipo_documento == 'D.N.I'){
      if($("#param").val() == "" || $("#param").val() == undefined || $("#param").val().length <= 0){
        return this.error('error','Ingresar Nro. Documento')
      }
      //validaciones
      this.clienteService.obtenerDatosXdni($("#param").val())
      .subscribe((res:any) => {
        console.log(res)
        const data = res as ClientesConsultado
        this.clienteSeleccion.nombres = data.nombres
        this.clienteSeleccion.apellidos = data.apellido_paterno + ' ' + data.apellido_materno
        this.clienteSeleccion.direccion = '';
        this.valorConsulta = 'D.N.I'
        //console.log(this.clienteSeleccion.nombres)
      },(err:any)=>{
        console.log(err)
        this.error('error','Error al consultar D.N.I')
      });
    }else{
      if($("#param").val() == "" || $("#param").val() == undefined || $("#param").val().length <= 0){
        return this.error('error','Ingresar Nro. Documento')
      }
      //validaciones
      this.clienteService.obtenerDatosXRuc($("#param").val())
      .subscribe(res => {
        console.log(res)
        const data = res as ClientesConsultado
        this.clienteSeleccion.nombres = data.razon_social
        this.clienteSeleccion.direccion = data.domicilio_fiscal
        this.clienteSeleccion.apellidos = ''
        this.estadoEmpresa = 'Estado '+data.contribuyente_estado
        this.valorConsulta = 'R.U.C'
      },err=>{
        console.log(err)
        this.error('error','Error al consultar R.U.C')
      });
    }
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
