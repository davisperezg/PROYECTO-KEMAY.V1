import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cliente-insta-registrado',
  templateUrl: './dialog-cliente-insta-registrado.component.html',
  styleUrls: ['./dialog-cliente-insta-registrado.component.css']
})
export class DialogClienteInstaRegistradoComponent implements OnInit {

  constructor
  (
    public dialogRef: MatDialogRef<DialogClienteInstaRegistradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }
  close(): void {
    this.dialogRef.close(false);
  }
}
