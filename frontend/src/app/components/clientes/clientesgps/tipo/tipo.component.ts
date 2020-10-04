import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ClientesService } from './../../../../services/clientes/clientes.service';
import { Cliente } from './../../../../models/plan/cliente';
import { FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesgpsComponent } from '../clientesgps.component';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

  //Tipo
  columnaTipo: string[] = ['plan','dias', 'opciones'];
  listDataTipo : MatTableDataSource<any>;
  crearVariable:string;
  @ViewChild('TipoSort') TipoSort: MatSort
  @ViewChild('MatPaginatorTipo') TipoPaginator: MatPaginator
  searchKey:string=''

  tipo: Cliente[]
  tipoSeleccion: Cliente

  firstFormGroup: FormGroup;
  constructor
  (
    private clienteService: ClientesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientesgpsComponent>,
  )
  {

  }

  ngOnInit(): void {
    this.getTipoPlan()
    this.firstFormGroup = this._formBuilder.group({
      plan: ['', Validators.required],
      desPlan: ['', Validators.required],
      valPlan: ['', Validators.required],
      idTipo: [''],
      dias: ['', Validators.required],
    });
  }
  addPlan(form?: NgForm){
    if(form.value.idTipo){
      this.clienteService.putPlan(form.value)
      .subscribe(res => {
        form.reset()
        this.getTipoPlan()
        this.exito('success',res)
      },err=>{
        this.error('error',err)
      });
    }else{
      this.clienteService.postPlan(form.value)
      .subscribe(res => {
        form.reset()
        this.getTipoPlan()
        this.exito('success',res)
      },err=>{
        this.error('error',err.error)
      });
    }

  }

  onSearchClearTipo(){
    this.searchKey='';
    this.applyFilterTipo()
  }
  applyFilterTipo(){
    this.listDataTipo.filter = this.searchKey.trim().toLowerCase()
  }

  getTipoPlan(){
    this.clienteService.listTipoCliente()
      .subscribe(res => {
      this.tipo = res as Cliente[];
      this.listDataTipo = new MatTableDataSource(this.tipo)
      this.listDataTipo.sort = this.TipoSort;
      this.listDataTipo.paginator = this.TipoPaginator

    });
  }

  editTipo(objeto:any){
    this.firstFormGroup.get('plan').setValue(objeto.plan)
    this.firstFormGroup.get('desPlan').setValue(objeto.desVal)
    this.firstFormGroup.get('idTipo').setValue(objeto.idTipo)
    this.firstFormGroup.get('valPlan').setValue(objeto.valPlan.toString())
    this.firstFormGroup.get('dias').setValue(objeto.dias)
  }
  close(){
    this.dialogRef.close(true)
  }
  deleteTipo(id, form?: NgForm){
    if(form.value.idTipo){
      this.clienteService.deletePlan(id)
      .subscribe((res:any) => {
        form.reset()
        this.getTipoPlan();
        this.exito('success',res)
      },(err:any)=>{
        this.error('error',err.error)
      });
    }else{
      this.clienteService.deletePlan(id)
      .subscribe((res:any) => {
        this.getTipoPlan();
        this.exito('success',res)
    },(err:any)=>{
      this.error('error',err.error)
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
