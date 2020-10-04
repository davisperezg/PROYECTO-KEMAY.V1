import { ClientesConsultado } from './../clientes/clientes-consultado';

export class Vehiculos {

  constructor(mar='',mod='',col='',plate=''){
    this.mar=mar
    this.mod=mod
    this.col=col
    this.plate=plate
  }

  idVehiculo:String;
  mar:String;
  mod:String;
  col:String;
  plate:string;

  idCliente:ClientesConsultado
}
