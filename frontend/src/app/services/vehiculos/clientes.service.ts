import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculos } from './../../models/vehiculos/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class ClientesVehiculoService {

  readonly  URL_API_PLACA_PACIFICO = 'http://localhost:4200/api'; //PROXY
  readonly  URL_API_VEHICULO = 'http://localhost:80/api/vehiculo';

  constructor
  (
    private http:HttpClient
  )
  {

  }
  obtenerPlaca(placa:string){
    return this.http.post(this.URL_API_PLACA_PACIFICO,placa)
  }
  postVehiculo(veh: Vehiculos){
    return this.http.post(this.URL_API_VEHICULO, veh)
  }
}
