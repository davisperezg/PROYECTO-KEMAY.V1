import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventario } from './../../models/inventario/inventario';
import { InventarioHistorial } from './../../models/InventarioHistorial/inventario-historial';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  readonly  URL_API_INVENTARIO = 'http://localhost:80/api/inventario';
  readonly  URL_API_HISTORIAL = 'http://localhost:80/api/inventario/historial';
  readonly  URL_API_HISTORIAL_INVENTARIO = 'http://localhost:80/api/inventario/historial/producto';
  constructor
  (
    private http:HttpClient
  )
  {

  }
  listInventario(){
    return this.http.get(this.URL_API_INVENTARIO);
  }
  postInventario(Inventario: Inventario){
    return this.http.post(this.URL_API_INVENTARIO, Inventario)
  }
  deleteInventario(idProducto:string){
    return this.http.delete(this.URL_API_INVENTARIO + `/${idProducto}`);
  }
  putInventario(inventario: Inventario){
    return this.http.put(this.URL_API_INVENTARIO + `/${inventario.id_inventario}`, inventario);
  }
  postInventarioHistorial(Historial: InventarioHistorial){
    return this.http.post(this.URL_API_HISTORIAL, Historial)
  }
  listInventarioHistorial(idInventario:string){
    return this.http.get(this.URL_API_HISTORIAL+`/${idInventario}`);
  }
  listInventarioXProducto(idInventario:string){
    return this.http.get(this.URL_API_HISTORIAL_INVENTARIO+`/${idInventario}`);
  }
}
