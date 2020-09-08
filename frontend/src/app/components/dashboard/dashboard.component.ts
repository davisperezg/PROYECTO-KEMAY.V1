import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router'

declare var $:any;
declare var JQuery:any;
//declare var dataTable:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //showFiller = false;
  public sessionStorage = sessionStorage

  constructor(public loginService: LoginService, private router:Router) { }
  ngOnInit(): void {
  //  $("#table").dataTable();
    //crea session y elimina formdata login
    if(!this.sessionStorage.getItem('session')){
      this.sessionStorage.setItem('session','true') ;
    }
    if(this.sessionStorage.getItem('isValid') == null){
      localStorage.clear()
      this.sessionStorage.clear()
      //alert('validación manipulada max(3) intentos será bloqueado')
      this.router.navigate(['/login']);
    }
    //si elimina el token en principal
    if (!this.loginService.verificarToken()) {
      this.sessionStorage.clear()//elimina las sessiones creadas
      localStorage.removeItem('data') //elimina la data, si eliminó token
      //alert('Ha eliminado su TOKEN de seguridad bloquearemos su cuenta si lo vuelve a intentar')
      this.router.navigate(['/login']);
    }
    //este método hace lo mismo que el de arriba
    if(!localStorage.getItem('data')){
      localStorage.clear()//elimina data, limpia todo localstorage
      this.sessionStorage.clear()//limpia sessiones
      //alert('Ha eliminado sus datos bloquearemos su cuenta si lo vuelve a intentar')
      this.router.navigate(['/login'])
    }
    /** obtener datos del logeo usuario y rol
     *
        const datos = localStorage.getItem('data')
        const convertirJSON = JSON.parse(datos)
        alert(convertirJSON.nombre)
        console.log(convertirJSON)
     */

  }

  salir(){
    //para que limpie session y limpia pagina
    this.sessionStorage.clear()
    //eliminando localstorage creados
    localStorage.clear()
    //redirecciona al login
    this.router.navigate(['/login']);
  }
  //valida si es Administrador y muestra cierto detalles que el  usuario no tiene
  check():boolean{
    if(sessionStorage.getItem('isValid') === 'ktech680db71493060816c4a'){
      return true
    }
  }

}
