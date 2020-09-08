import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogPDF',
  templateUrl: './dialogPDF.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class dialogPDF implements OnInit {

  constructor
  (
    public dialogo: MatDialogRef<dialogPDF>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {

  }

  ngOnInit(): void {
    console.log(this.data)
  }

 cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
}
