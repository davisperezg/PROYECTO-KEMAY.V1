export class ClientesConsultado {

  constructor
  (
    name='',
    first_name='',
    last_name='',
    razon_social='',
    domicilio_fiscal='',
    contribuyente_estado='',
    fl_name='',
    direction='',
    numero_identificacion='',
    tipo_identificacion='',
    cel='',
    cel2='',
    plan='',
    fechaInsertada='',
    nombres='',
    apellido_paterno='',
    apellido_materno='',

  )
  {
    this.name=name; //NOMBRE
    this.first_name=first_name;
    this.last_name=last_name;
    this.razon_social=razon_social;
    this.domicilio_fiscal=domicilio_fiscal;
    this.contribuyente_estado=contribuyente_estado;
    this.fl_name=fl_name; // APELLIDOS NO
    this.direction=direction; //DIRECCION
    this.numero_identificacion=numero_identificacion //NUM_IDENTI
    this.tipo_identificacion=tipo_identificacion //TIP_IDENTI
    this.cel=cel; //CEL 1
    this.cel2=cel2; //CEL 2
    this.plan=plan; //TIPCLI
    this.fechaInsertada=fechaInsertada; //FECHA INSERTADA
    this.nombres=nombres;
    this.apellido_paterno=apellido_paterno;
    this.apellido_materno=apellido_materno;
  }
  id_clientes:string;
  fl_name:string;
  name:string;
  first_name:string;
  last_name:string;
  razon_social:string;
  domicilio_fiscal:string;
  contribuyente_estado:string;
  direction:string;
  numero_identificacion:string
  tipo_identificacion:string
  cel:string;
  cel2:string;
  plan:string;
  fechaInsertada:string
  nombres:string;
  apellido_paterno:string;
  apellido_materno:string
  dni:string;
}
