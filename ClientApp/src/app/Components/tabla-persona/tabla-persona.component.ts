import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from '../../Services/persona.service';
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  @Input() personas: any;
  @Input() isMantenimiento = false;
  p: number = 1;

  cabeceras: string[] = ["Id Persona", "Nombre Completo", "Telefono", "Correo"];

  constructor(private personaService: PersonaService) {

  }

  ngOnInit() {

    this.personaService.getPersona().subscribe(
      data => this.personas = data
    );

  }

  eliminar(idPersona) {
    if (confirm("Desea eliminar realmente?") == true) {

    
    this.personaService.eliminar(idPersona).subscribe(data => {

      this.personaService.getPersona().subscribe(
        data => this.personas = data
      );

    })
    }

  }

}
