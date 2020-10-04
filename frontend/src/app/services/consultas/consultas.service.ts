import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Renovaciones } from './../../models/renovaciones/renovaciones';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  readonly  URL_API = 'http://localhost:80/api/consulta';
  readonly  URL_API_VENCIDOS = 'http://localhost:80/api/consulta/vencido';

  constructor(private http: HttpClient) { }

  getConsultaRenovacion(){
    return this.http.get(this.URL_API);
  }
  postRenovacion(renova:Renovaciones){
    return this.http.post(this.URL_API, renova)
  }
  putRenovacion(renova: Renovaciones){
    return this.http.put(this.URL_API + `/${renova.idRenova}`, renova);
  }
  deleteRenovacion(idRenova:string){
    return this.http.delete(this.URL_API + `/${idRenova}`);
  }
  obtenerRenovacion(idRenova:string){
    return this.http.get(this.URL_API + `/${idRenova}`);
  }

  getConsultaVencido(){
    return this.http.get(this.URL_API_VENCIDOS);
  }

}
