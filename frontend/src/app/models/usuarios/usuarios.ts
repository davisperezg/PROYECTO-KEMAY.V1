export class Usuarios {

  constructor(_id='', nombre_completo='',
  apellido_paterno='', apellido_materno='',
  roles='',
  email='',
  contrasenia='',nameroles=''
  ){
    //this.nombre_completo = nombre_completo
    this._id=_id;
    this.nombre_completo=nombre_completo;
    this.apellido_paterno=apellido_paterno;
    this.apellido_materno=apellido_materno;
    this.roles=roles;
    this.email=email;
    this.contrasenia=contrasenia;
    this.nameroles=nameroles
  }
  _id:string;
  nombre_completo: string;
  apellido_paterno:string;
  apellido_materno:string;
  roles:string;
  email:string;
  contrasenia:string;
  nameroles:string;
}
