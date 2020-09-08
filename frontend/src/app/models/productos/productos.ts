export class Productos {
  constructor(id_categoria='', id_marca='',
  id_tipo_producto='', marca='',
  modelo='',
  detalle='',
  descripcion='',precio='00.00',serie=''
  ){
    //this.nombre_completo = nombre_completo
    this.id_categoria=id_categoria;
    this.id_marca=id_marca;
    this.id_tipo_producto=id_tipo_producto;
    this.marca=marca;
    this.modelo=modelo;
    this.detalle=detalle;
    this.descripcion=descripcion;
    this.precio=precio
    this.serie=serie
  }
  id_producto:string;
  id_categoria: string;
  id_marca:string
  id_tipo_producto:string;
  categoria:string
  marca:string;
  tipo_producto:string
  modelo:string;
  detalle:string;
  descripcion:string;
  precio:string;
  serie:string
  //foto no ira
}
