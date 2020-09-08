import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from './../../models/categorias/categorias';
import { TiposPorducto } from './../../models/tiposProducto/tipos-porducto';
import { Marca } from './../../models/marca/marca';
import { Productos } from './../../models/productos/productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosService{

  readonly  URL_API_PRODUCTOS = 'http://localhost:80/api/productos';
  readonly  URL_API_CATEGORIA = 'http://localhost:80/api/categorias';
  readonly  URL_API_TIPO = 'http://localhost:80/api/tipos';
  readonly  URL_API_MARCA = 'http://localhost:80/api/marcas';
  readonly  URL_API_TIPOXCATEGORIA = 'http://localhost:80/api/productos/tipo/categoria';
  readonly  URL_API_MARCAXTIPO = 'http://localhost:80/api/productos/marca/tipo';
  readonly  URL_API_PRODUCTOXMARCA = 'http://localhost:80/api/productos/marca';

  constructor
  (
    private http:HttpClient
  )
  {

  }
  listCategoria(){
    return this.http.get(this.URL_API_CATEGORIA);
  }
  listTipo(){
    return this.http.get(this.URL_API_TIPO);
  }
  listMarca(){
    return this.http.get(this.URL_API_MARCA);
  }
  listProducto(){
    return this.http.get(this.URL_API_PRODUCTOS);
  }
  listTipoXCategoria(idCategoria:string){
    return this.http.get(this.URL_API_TIPOXCATEGORIA+`/${idCategoria}`);
  }
  listMarcaXTipo(idTipo:string){
    return this.http.get(this.URL_API_MARCAXTIPO+`/${idTipo}`);
  }
  //PRODUCTO
  obtenerProducto(idProducto:string){
    return this.http.get(this.URL_API_PRODUCTOS+ `/${idProducto}`);
  }
  postProducto(Producto: Productos){
    return this.http.post(this.URL_API_PRODUCTOS, Producto)
  }
  putProducto(producto: Productos){
    return this.http.put(this.URL_API_PRODUCTOS + `/${producto.id_producto}`, producto);
  }
  deleteProducto(idProducto:string){
    return this.http.delete(this.URL_API_PRODUCTOS + `/${idProducto}`);
  }
  listProductoXcategoriaXtipoXmarca(idMar:string){
    return this.http.get(this.URL_API_PRODUCTOXMARCA+`/${idMar}`);
  }
  //CATEGORIA
  postCategoria(Categoria: Categorias){
    return this.http.post(this.URL_API_CATEGORIA, Categoria)
  }
  putCategoria(categoria: Categorias){
    return this.http.put(this.URL_API_CATEGORIA + `/${categoria.id_categoria}`, categoria);
  }
  deleteCategoria(idCategoria:string){
    return this.http.delete(this.URL_API_CATEGORIA + `/${idCategoria}`);
  }
  //TIPO
  postTipo(Tipo: TiposPorducto){
    return this.http.post(this.URL_API_TIPO, Tipo)
  }
  putTipo(tipo: TiposPorducto){
    return this.http.put(this.URL_API_TIPO + `/${tipo.id_tipo_producto}`, tipo);
  }
  deleteTipo(idTipo:string){
    return this.http.delete(this.URL_API_TIPO + `/${idTipo}`);
  }
  //MARCA
  postMarca(Marca: Marca){
    return this.http.post(this.URL_API_MARCA, Marca)
  }
  putMarca(marca: Marca){
    return this.http.put(this.URL_API_MARCA + `/${marca.id_marca}`, marca);
  }
  deleteMarca(idMarca:string){
    return this.http.delete(this.URL_API_MARCA + `/${idMarca}`);
  }
}
