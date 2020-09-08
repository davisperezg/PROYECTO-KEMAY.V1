import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mensaje',
  templateUrl: './dialog-mensaje.component.html',
  styleUrls: ['./dialog-mensaje.component.css']
})
export class DialogMensajeComponent implements OnInit {
  dataProducto:[]
  dataTitulo:[]
  constructor
  (
    public dialogo: MatDialogRef<DialogMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  )
  {
    this.dataProducto = data.detalle
    this.dataTitulo = data.descripcion
  }



  ngOnInit(): void {

  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
}
