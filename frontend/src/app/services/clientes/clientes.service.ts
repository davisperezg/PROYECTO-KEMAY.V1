import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from './../../models/clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  readonly  URL_API_CLIENTE = 'http://localhost:80/api/clientes';
  constructor
  (
    private http:HttpClient
  )
  {

  }
  listCliente(){
    return this.http.get(this.URL_API_CLIENTE);
  }
  postCliente(Cliente: Clientes){
    return this.http.post(this.URL_API_CLIENTE, Cliente)
  }
  deleteCliente(idCliente:string){
    return this.http.delete(this.URL_API_CLIENTE + `/${idCliente}`);
  }
}
