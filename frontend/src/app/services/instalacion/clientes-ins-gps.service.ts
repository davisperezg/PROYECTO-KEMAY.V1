import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstalacionCliente } from './../../models/instalacion/instalacion-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesInsGpsService {
  readonly URL_TIPO_CATEGORIA = 'http://localhost:80/api/tipos'
  readonly URL_OPERADOR = 'http://localhost:80/api/instalacion/operador'
  readonly URL_TECNICO = 'http://localhost:80/api/instalacion/tecnico'
  readonly URL_INSTALACION = 'http://localhost:80/api/instalacion'

  constructor
  (
    private http:HttpClient
  ) { }

  deleteInstalacion(idIns:string){
    return this.http.delete(this.URL_INSTALACION + `/${idIns}`);
  }
  putInstalacionFechaInicioTermino(insta: InstalacionCliente){
    return this.http.put(this.URL_INSTALACION + `/${insta.idIns}`, insta);
  }
  listInstalacion(){
    return this.http.get(this.URL_INSTALACION);
  }
  listTecnico(){
    return this.http.get(this.URL_TECNICO);
  }
  listOperador(){
    return this.http.get(this.URL_OPERADOR);
  }
  listTipo(){
    return this.http.get(this.URL_TIPO_CATEGORIA);
  }
  postInstalacion(insta: InstalacionCliente){
    return this.http.post(this.URL_INSTALACION, insta)
  }
  obtenerInstalacion(idIns:string){
    return this.http.get(this.URL_INSTALACION+ `/${idIns}`);
  }
}
