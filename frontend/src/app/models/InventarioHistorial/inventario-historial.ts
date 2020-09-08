export class InventarioHistorial {
  constructor(id_inventario='',
  cantidad='',
  fecha_modificada='',motivo=''
  ){
    //this.nombre_completo = nombre_completo
    this.id_inventario=id_inventario;
    this.cantidad=cantidad;
    this.fecha_modificada=fecha_modificada
    this.motivo=motivo
  }
  id_inventario:string;
  fecha_modificada: string;
  cantidad:string
  motivo:string;
}
