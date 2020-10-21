import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'



@Injectable()


export class ProductoService {

  urlBase: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {

    this.urlBase = baseurl;
  }

  public getProducto() {


    return this.http.get(this.urlBase + "api/producto/listarproductos");

  }

  public getFiltroProductoporNombre(nombre) {


    return this.http.get(this.urlBase + "api/producto/filtrarProductosporNombre/" + nombre);

  }

  public obtenerProductoPorId(idProducto) {

    return this.http.get(this.urlBase + "api/producto/obtenerProductoPorId/" + idProducto);

  }

  public listarMarcas() {

    return this.http.get(this.urlBase + "api/producto/listarMarcas");

  }

  public eliminarProducto(idProducto) {

    return this.http.get("api/Producto/eliminarProducto/" + idProducto);

  }

  public registrarProducto(ProductoCLS) {

    return this.http.post("api/Producto/registrarProducto", ProductoCLS);

  }

  public getFiltroProductoPorCategoria(idcategoria) {

    return this.http.get(this.urlBase + "api/producto/filtrarProductosPorCategoria/" + idcategoria)

  }

}
