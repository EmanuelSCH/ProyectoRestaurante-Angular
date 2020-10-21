import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-tipo-usuario',
  templateUrl: './tabla-tipo-usuario.component.html',
  styleUrls: ['./tabla-tipo-usuario.component.css']
})
export class TablaTipoUsuarioComponent implements OnInit {

  tipoUsuarios: any;
  cabeceras: string[] = ["Id Tipo Usuario", "Nombre", "Descripcion"];
  @Input() isMantenimiento: boolean = false;
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuarioService.listarTipoUsuarios().subscribe(data => {
      this.tipoUsuarios = data;
    })
  }

  eliminar(iidTipoUsuario) {

    this.usuarioService.eliminarTipoUsuario(iidTipoUsuario).subscribe(data => {

      this.usuarioService.listarTipoUsuarios().subscribe(data => {
        this.tipoUsuarios = data;
      })

    })

  }

}
