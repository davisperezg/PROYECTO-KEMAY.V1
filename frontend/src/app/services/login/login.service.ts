import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../../models/login/login';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly URL_API = 'http://localhost:80/api/usuarios/login'

  constructor(private http: HttpClient, private router :Router) {

  }

  postLogin(Login:Login){
    return this.http.post(this.URL_API, Login)
  }

  verificarToken(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    return localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
