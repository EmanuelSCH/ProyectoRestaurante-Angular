import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() productos: any;
  @Input() isMantenimiento = false;
  p: number = 1;

    cabeceras = ['Id Producto', 'Nombre', 'Precio', 'Stock', 'Nombre Categoria'];

    constructor(private producto: ProductoService) {

    }

    ngOnInit() {
        this.producto.getProducto().subscribe((data: any) => {
            console.log(data);
            this.productos = data;
        });
    }

  eliminarProducto(idProducto) {
    if (confirm("¿Desea eliminar el registro? ") == true) {
      this.producto.eliminarProducto(idProducto).subscribe(p => {

        this.producto.getProducto().subscribe(

          data => this.productos = data

        );

      });
    }
  }

}
