import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from './../../models/login/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //usuario: Usuarios[]
  public sessionStorage = sessionStorage
  user : Login
  formData: any = new FormData();
  constructor(
      private loginService: LoginService,
      private router: Router
    ) {
    this.user = new Login()
  }

  ngOnInit(): void
  {

    if (this.loginService.verificarToken()) {
    this.router.navigate(['']);
    }
    if (!this.loginService.verificarToken()) {
      this.sessionStorage.clear()
      this.router.navigate(['/login']);
    }
  }

  login(){
      this.loginService.postLogin(this.user)
      .subscribe(
        res => {//obtener mas datos ir a token del backend
          //obtiene el token del login por un json
          const token = res['key']
          const obtenerDatos = res['info']
          const data = {
            ID:obtenerDatos.ID,
            email:obtenerDatos.email,
            datos:obtenerDatos.datos,
            rolname:obtenerDatos.rol,
            roldes:obtenerDatos.des_rol
          }
          //almacena el token en el local storage ingresando al objeto
          //localStorage.setItem('data', data)
          localStorage.setItem('token', token.token)
          localStorage.setItem('data', JSON.stringify(data))
          //redirecciona a:
          this.router.navigate([''])
          location.reload();
          if(data.rolname == 'ADMINISTRADOR'){
            this.sessionStorage['isValid'] = 'ktech680db71493060816c4a';
          }else{
            this.sessionStorage['isValid'] = 'ktecha74db71493060816c4b';
          }

        },
        err => {
          alert(err.error)
        }
      )
    }
}
