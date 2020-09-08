import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventarioHistorial } from '../../models/InventarioHistorial/inventario-historial';
import { InventarioService } from '../../services/inventario/inventario.service'
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventario } from '../../models/inventario/inventario';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
@Component({
  selector: 'app-inventario-historial',
  templateUrl: './inventario-historial.component.html',
  styleUrls: ['./inventario-historial.component.css']
})
export class InventarioHistorialComponent implements OnInit {
  date: Date
  inventarioHistorial:InventarioHistorial[]
  inventarioHistorialSeleccion:InventarioHistorial
  inventarioSeleccion: Inventario
  descripcion = '';
  cantidadaSolicitada:string
  UltimaFecha:string
  productoSeleccion:''
  muestraNombreCantida:string
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  HistoriaXproducto:InventarioHistorial[]
  constructor
  (
    private inventarioService: InventarioService,
    private dialog:MatDialog,
    public dialogo: MatDialogRef<InventarioHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

  )
  {
    this.inventarioHistorialSeleccion = new InventarioHistorial()
    this.date = new Date()
    this.inventarioSeleccion = new Inventario()
    this.inventarioSeleccion = new Inventario()
    this.productoSeleccion = ''
  }

  ngOnInit(): void {
    this.buscarInventario(this.data)
    this.buscarHistorial(this.data.id_inventario)
    //tambien
    this.listarHistoriXproducto()
  }
  listarHistoriXproducto(){
    this.inventarioService.listInventarioXProducto(this.data.id_inventario)
    .subscribe((res:any) => {
      this.HistoriaXproducto = res as InventarioHistorial[];
    }, err => {
      this.error('error',err.error)
    })
  }
  getInventarioPDF(){

    var data = [];
    const mainData = this.HistoriaXproducto
    for (var i = 0 ; i < mainData.length; i++) {
      data.push([
        mainData[i].motivo,
        mainData[i].cantidad,
        this.dateFormat1(mainData[i].fecha_modificada)
      ])
    }
    return data;
  }
  dateFormat1(d) {
    var t = new Date(d);
    var hours = t.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return this.dias[t.getDay()] +' ' +t.getDate() + ' de ' +
    this.monthNames[t.getMonth()] + ', ' + t.getFullYear() +' a las '+
    t.getHours() +':'+ t.getMinutes()+':'+t.getSeconds()+'s '+ampm;
  }
  generarPDF(){
    //obtener el mes
    //const MES = this.dateFormat1(new Date)
    const doc = new jsPDF()
    doc.text('KEMAY TECHNOLOGY',10,10)
    doc.text('Historial del Producto: '+this.data.producto ,10,20)
    const columns   = ['MOTIVO','CANTIDAD','FECHA']
    var data:any = this.getInventarioPDF()
    doc.autoTable(columns,data,
      { margin:{ top: 25  , left:10}}
    );
    doc.save('Historial_Inventario_'+this.data.producto+'.pdf')
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
  buscarInventario(data){
    this.inventarioSeleccion = data
  }
  buscarHistorial(idInventario){
    //metodo
    this.inventarioService.listInventarioHistorial(idInventario)
    .subscribe((res:any) => {
      if(res.length === 0){
        this.cantidadaSolicitada = '------------------------ sin historial ------------------------'
        this.UltimaFecha = '------------------------ sin historial ------------------------'
        this.descripcion = '------------------------ sin historial ------------------------'
      }else{
        this.inventarioHistorial = res as InventarioHistorial[];
        const datos:any = this.inventarioHistorial
        this.cantidadaSolicitada = datos[0].cantidad
        this.UltimaFecha = this.dateFormat1(datos[0].fecha_modificada)
        this.descripcion = datos[0].motivo
        this.cantidadSolicitada(datos[0].cantidad) //valida si es ingreso o retiro
      }


    }, err => {
      this.error('error',err.error)
    })
  }
  cantidadSolicitada(cantidad){
    if(cantidad <= -1 ){
      this.muestraNombreCantida='Retirada'
    }else{
      this.muestraNombreCantida='Ingresada'
    }
  }
  editarPrecio(form?:NgForm){
    const anio = this.date.getFullYear()
    const mes = this.date.getMonth()+1
    const dia = this.date.getDate()
    const fecha = anio+'-'+mes+'-'+dia
    const hora = this.date.getHours()
    const minuto = this.date.getMinutes()
    const segundos = this.date.getSeconds()
    const tiempo = hora+':'+minuto+':'+segundos
    const data:any = {
      id_inventario:form.value.id_inventario,
      cantidad: form.value.cantidad
    }
    const dataHistorial:any = {
      id_inventario:form.value.id_inventario,
      cantidad: form.value.cantidad,
      motivo:form.value.motivo,
      fecha_modificada:fecha+' '+tiempo
    }
    const datosInventario:any = this.inventarioSeleccion
    //console.log(datosInventario.cantidad)
    //console.log(data.cantidad)
    if(data.cantidad >= -datosInventario.cantidad){
      this.inventarioService.putInventario(data)
      .subscribe(res => {
            form.reset()
            //this.getInventario()
            this.exito('success',res)
            this.confirmado()
            this.inventarioService.postInventarioHistorial(dataHistorial)
            .subscribe(res => {
            //no se muestra mensaje de exito

            },err =>{
              this.error('error',err.error)
            })
      },err=>{
        this.error('error',err.error)
      });
    }else{
      this.error('error','Esta cantidad sobrepasa al stock actual')
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
