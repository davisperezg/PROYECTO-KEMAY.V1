import { Usuarios } from './../usuarios/usuarios';
import { Clientes } from './../clientes/clientes';

export class Cotiza {
  constructor
  (
    garantia='1 AÑO',
    entrega=1
  )
  {
    this.garantia=garantia
    this.entrega=entrega
  }
  id_proforma:string;
  usuarios:Usuarios;
  fecha:string;
  garantia:string;
  precio:string;
  oferta:string;
  entrega:number;
  formapago:string;
  clientes:Clientes;
  id_clientes:string;
  confirmado:String
}
