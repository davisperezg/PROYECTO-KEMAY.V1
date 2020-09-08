import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roles } from 'src/app/models/roles/roles';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
declare var M:any;
declare var JQuery:any;
declare var $:any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  usuarios: Usuarios[]
  roles: Roles[]
  usuariosSeleccionado: Usuarios;
  user: Usuarios
  //nameroles = new Usuarios()
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
    ) {
    this.usuariosSeleccionado = new Usuarios();
    this.user = new Usuarios()
  }

  title = 'Usuarios';

  ngOnInit(): void {
    this.getRol()
    this.getUsuarios();
    //this.dibujarTabla();
    //this.dtTrigger.next()
  }
  /**
   * dibujarTabla(){
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:10,
      processing:true,
      language:{
        url:'//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    }
  }
   */

  resetForm(form?: NgForm){
    if(form.value._id){
      form.reset();
      this.getUsuariosNew();
      this.dtTrigger.complete()
    }else{
      form.reset();
    }
  }
  getRol(){
    this.usuarioService.getRol()
    .subscribe(res => {
      this.roles = res as Roles[];

    });
  }
  getUsuarios(){
    this.usuarioService.getUsuarios()
    .subscribe((res:any) => { //((res:any) => {
      this.usuarios = res.usuarios as Usuarios[];
      this.dtTrigger.next()
     //console.log(res)
    },err => {
      if(err.error){
        this.error('Acceso restringido!')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
        //validar redireccionar a nueva pagina sin acceso y advertir luego ir a login
        location.reload()
      }
    });
  }
  getUsuariosNew(){
    this.usuarioService.getUsuarios()
    .subscribe(res => { //((res:any) => {
      this.usuarios = res['usuarios'] as Usuarios[];
      this.dtTrigger.complete();
    });
  }
  addUsuarios(form?: NgForm){
    if(form.value._id){
      if(form.value.roles === '5f1b5680db71493060816c4a'){
        const _id = form.value._id;
        const nombre_completo = form.value.nombre_completo;
        const apellido_paterno = form.value.apellido_paterno;
        const apellido_materno = form.value.apellido_materno;
        const roles = form.value.roles;
        const nameroles = 'Administrador';
        const email = form.value.email;
        const contrasenia = form.value.contrasenia;
        const valores:any = {_id,nombre_completo,apellido_paterno,
          apellido_materno,roles,nameroles,email,contrasenia}

        this.usuarioService.putUsuario(valores)
        .subscribe(res => {
          this.resetForm(form);
          this.exito(res)
          this.getUsuariosNew();
          //location.href='/usuarios#tabla'
          //pestaña dos
          $("#id_new").removeClass('active')
          $("#new").removeClass('active show')
          //redireccionando a la pestaña uno
          $("#id_list").addClass('active')
          $("#list").addClass('active show')
        },err =>{
          this.error(err.error)
        })
      }else{
        const _id = form.value._id;
        const nombre_completo = form.value.nombre_completo;
        const apellido_paterno = form.value.apellido_paterno;
        const apellido_materno = form.value.apellido_materno;
        const roles = form.value.roles;
        const nameroles = 'Usuario';
        const email = form.value.email;
        const contrasenia = form.value.contrasenia;
        const valores:any = {_id,nombre_completo,apellido_paterno,
          apellido_materno,roles,nameroles,email,contrasenia}
        this.usuarioService.putUsuario(valores)
        .subscribe(res => {
          this.resetForm(form);
          this.exito(res)
          this.getUsuariosNew();
          $("#id_new").removeClass('active')
          $("#new").removeClass('active show')
          //redireccionando a la pestaña uno
          $("#id_list").addClass('active')
          $("#list").addClass('active show')
        },err =>{
          this.error(err.error)
        })
      }
    }else{
    if(form.value.roles === '5f1b5680db71493060816c4a'){
      const nombre_completo = form.value.nombre_completo;
      const apellido_paterno = form.value.apellido_paterno;
      const apellido_materno = form.value.apellido_materno;
      const roles = form.value.roles;
      const nameroles = 'Administrador';
      const email = form.value.email;
      const contrasenia = form.value.contrasenia;
      const valores:any = {nombre_completo,apellido_paterno,
        apellido_materno,roles,nameroles,email,contrasenia}

      this.usuarioService.postUsuario(valores)
      .subscribe((res:any) => {
        this.resetForm(form);
        this.exito(res.mensaje)
        this.getUsuariosNew();
      },(err:any) =>{
        this.error(err.error.mensaje)
      })
    }else{
      const nombre_completo = form.value.nombre_completo;
      const apellido_paterno = form.value.apellido_paterno;
      const apellido_materno = form.value.apellido_materno;
      const roles = form.value.roles;
      const nameroles = 'Usuario';
      const email = form.value.email;
      const contrasenia = form.value.contrasenia;
      const valores:any = {nombre_completo,apellido_paterno,
        apellido_materno,roles,nameroles,email,contrasenia}

      this.usuarioService.postUsuario(valores)
      .subscribe((res:any) => {
        this.resetForm(form);
        this.exito(res.mensaje)
        this.getUsuariosNew();
      },(err:any) =>{
        this.error(err.error.mensaje)
      })
    }

    }
  }

  editUsuario(usuario: Usuarios){

    usuario.contrasenia = ""
    this.usuariosSeleccionado = usuario;
    //location.href='/usuarios#new'
    $("#id_list").removeClass('active')
    $("#list").removeClass('active show')
    //redireccionando a la pestaña dos
    $("#id_new").addClass('active')
    $("#new").addClass('active show')
  };

  deleteUsuario(_id: string, form?: NgForm ){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        if(form.value._id){
          form.reset();
          this.usuarioService.deleteUsuario(_id)
          .subscribe(res => {
            form.reset()
            this.getUsuariosNew();
            this.exito(res)
          },err =>{
            this.error(err)
          });
         }else{
          this.usuarioService.deleteUsuario(_id)
          .subscribe(res => {
            this.getUsuariosNew();
            this.exito(res)
          },(err:any) =>{
            this.error(err)
          });
         }
      }
    })
  }
  exito(mensaje){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }
  error(mensaje){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
