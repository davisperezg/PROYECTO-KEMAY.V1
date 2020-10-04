import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from './../../models/clientes/clientes';
import { ClientesConsultado } from './../../models/clientes/clientes-consultado';
import { Cliente } from './../../models/plan/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  readonly  URL_API_CLIENTE = 'http://localhost:80/api/clientes';
  readonly  URL_API_TIPO_CLIENTE = 'http://localhost:80/api/clientes/tipo';
  readonly  URL_API_CLIENTE_GPS = 'http://localhost:80/api/clientes/gps';

  readonly  URL_API_CLIENTE_DNI = 'https://dni.optimizeperu.com/api/persons';
  readonly  URL_API_CLIENTE_RUC = 'https://dni.optimizeperu.com/api/company';
  readonly  URL_API_CLIENTE_DNI_OTRO = 'http://localhost:4200/reniec';

  constructor
  (
    private http:HttpClient
  )
  {

  }
  //GPS
  ConsultarClienteExistente(DNI:string){
    return this.http.get(this.URL_API_CLIENTE_GPS+ `/${DNI}`);
  }
  postClienteGPS(clienteGPS: ClientesConsultado){
    return this.http.post(this.URL_API_CLIENTE_GPS, clienteGPS)
  }
  //FIN GPS

  //TIPO DE PLAN
  obtenerValor(idTip:string){
    return this.http.get(this.URL_API_TIPO_CLIENTE+ `/${idTip}`);
  }

  listTipoCliente(){
    return this.http.get(this.URL_API_TIPO_CLIENTE);
  }
  postPlan(Cliente: Cliente){
    return this.http.post(this.URL_API_TIPO_CLIENTE, Cliente)
  }
  putPlan(plan: Cliente){
    return this.http.put(this.URL_API_TIPO_CLIENTE + `/${plan.idTipo}`, plan);
  }
  deletePlan(idPlan:string){
    return this.http.delete(this.URL_API_TIPO_CLIENTE + `/${idPlan}`);
  }
  //FIN TIPO DE PLAN
  listCliente(){
    return this.http.get(this.URL_API_CLIENTE);
  }
  postCliente(Cliente: Clientes){
    return this.http.post(this.URL_API_CLIENTE, Cliente)
  }
  deleteCliente(idCliente:string){
    return this.http.delete(this.URL_API_CLIENTE + `/${idCliente}`);
  }
  obtenerDatosXdni(DNI:string){
    return this.http.get(this.URL_API_CLIENTE_DNI_OTRO+ `/${DNI}`);
  }
  obtenerDatosXRuc(RUC:string){
    return this.http.get(this.URL_API_CLIENTE_RUC+ `/${RUC}`);
  }
}
