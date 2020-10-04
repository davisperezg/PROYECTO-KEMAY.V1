import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recibo } from './../../models/recibo/recibo';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  readonly  URL_API = 'http://localhost:80/api/recibo';

  constructor(private http: HttpClient) { }

  obtenerRecibo(idRecibo){
    return this.http.get(this.URL_API+ `/${idRecibo}`);
  }

  getRecibo(){
    return this.http.get(this.URL_API);
  }
  postRecibo(recibo:Recibo){
    return this.http.post(this.URL_API, recibo)
  }
  putRecibo(recibo: Recibo){
    return this.http.put(this.URL_API + `/${recibo.idRecibo}`, recibo);
  }
  deleteRecibo(idRecibo:string){
    return this.http.delete(this.URL_API + `/${idRecibo}`);
  }

}
