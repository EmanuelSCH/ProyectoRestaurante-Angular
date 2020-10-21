import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../Services/persona.service';

@Component({
  selector: 'filtrado-persona-nombre-completo',
  templateUrl: './filtrado-persona-nombre-completo.component.html',
  styleUrls: ['./filtrado-persona-nombre-completo.component.css']
})
export class FiltradoPersonaNombreCompletoComponent implements OnInit {

  personas: any;

  constructor(private personaService: PersonaService) {

  }

  ngOnInit() {
  }

  buscar(nombreCompleto) {

    this.personaService.getPersonaFiltro(nombreCompleto.value)
      .subscribe(res => this.personas = res);
  }

}
