import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cotiza } from './../../models/cotiza/cotiza';
import { Detalle } from './../../models/cotiza/detalle';

@Injectable({
  providedIn: 'root'
})
export class CotizaService {

  readonly  URL_API_COTIZA = 'http://localhost:80/api/cotiza';
  readonly  URL_API_COTIZA_DETALLE = 'http://localhost:80/api/cotiza/detalle';

  constructor
  (
    private http:HttpClient
  )
  {

  }
  postProforma(Proforma: Cotiza){
    return this.http.post(this.URL_API_COTIZA, Proforma)
  }
  postDetalle(Detalle: Detalle){
    return this.http.post(this.URL_API_COTIZA_DETALLE, Detalle)
  }
  obtenerProforma(idProforma:string){
    return this.http.get(this.URL_API_COTIZA+ `/${idProforma}`);
  }
  obtenerDetalleProforma(idProforma:string){
    return this.http.get(this.URL_API_COTIZA_DETALLE+ `/${idProforma}`);
  }
}
