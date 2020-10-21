import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService) {
  }

  ngOnInit() {

    this.categoria.getCategoria().subscribe((data: any) => {
      console.log(data);
      this.categoria = data;
    });

  }
   
}
