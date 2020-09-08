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

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
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
      this.clienteService.postCliente(form.value)
      .subscribe(res => {
        form.reset()
        this.getClientes()
        this.exito('success',res)
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
