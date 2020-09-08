import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../../models/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {


  readonly  URL_API = 'http://localhost:80/api/usuarios';

  readonly  URL_API_ROL = 'http://localhost:80/api/roles';


  constructor(private http: HttpClient) {

  }

  getUsuarios(){
    return this.http.get(this.URL_API);
  }

  postUsuario(Usuarios: Usuarios){
    return this.http.post(this.URL_API, Usuarios);
  }

  putUsuario(usuarios: Usuarios){
    return this.http.put(this.URL_API + `/${usuarios._id}`, usuarios);
  }

  getRol(){
    return this.http.get(this.URL_API_ROL);
  }

  deleteUsuario(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
