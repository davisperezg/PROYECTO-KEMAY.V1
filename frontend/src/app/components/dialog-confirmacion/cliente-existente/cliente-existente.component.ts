import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-existente',
  templateUrl: './cliente-existente.component.html',
  styleUrls: ['./cliente-existente.component.css']
})
export class ClienteExistenteComponent implements OnInit {
  constructor
  (
    public dialogRef: MatDialogRef<ClienteExistenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  )
  {

  }

  ngOnInit(): void {
    console.log(this.data.data)
  }
  confirm(): void {
    this.dialogRef.close(this.data);
  }
  close(): void {
    this.dialogRef.close(false);
  }

}
