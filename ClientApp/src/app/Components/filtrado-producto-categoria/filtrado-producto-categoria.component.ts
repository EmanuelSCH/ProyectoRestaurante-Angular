import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {

  productos: any;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
  }

  buscar(categoria) {

    if (categoria.value == "") {
      this.productoService.getProducto().subscribe(rpta => this.productos = rpta);
    } else {
      this.productoService.getFiltroProductoPorCategoria(categoria.value).
        subscribe(rpta => this.productos = rpta);

    }
    

  }

  limpiar(categoria) {

    categoria.value = "";
    return this.productoService.getProducto().subscribe(rpta => this.productos=rpta);

  }


}
