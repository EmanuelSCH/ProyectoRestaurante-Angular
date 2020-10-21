import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'pagina-form-mantenimiento',
  templateUrl: './pagina-form-mantenimiento.component.html',
  styleUrls: ['./pagina-form-mantenimiento.component.css']
})
export class PaginaFormMantenimientoComponent implements OnInit {

  pagina: FormGroup
  titulo: string = "";
  parametro: string = "";

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) {

    this.pagina = new FormGroup({

      "iidpagina": new FormControl("0"),
      "mensaje": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "accion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "bvisible": new FormControl("1")

    })

    this.activatedRoute.params.subscribe(param => {

      this.parametro = param["id"];
      if (this.parametro != "nuevo") {

        this.titulo = "Editar Pagina";

      } else {

        this.titulo = "Agregar Pagina";

      }
    });

  }

  ngOnInit() {

    if (this.parametro != "nuevo") {

      this.usuarioService.recuperarPagina(this.parametro).subscribe(data => {

        if (data["accion"] == null) {

          this.router.navigate(["/no-encontro-informacion"]);

        } else {

          this.pagina.controls["iidpagina"].setValue(data["iidpagina"]);
          this.pagina.controls["mensaje"].setValue(data["mensaje"]);
          this.pagina.controls["accion"].setValue(data["accion"]);
          this.pagina.controls["bvisible"].setValue(data["bvisible"].toString());
        }


      })

    }

  }

  guardarDatos() {

    if (this.pagina.valid == true) {

      this.usuarioService.guardarPagina(this.pagina.value).subscribe(data => {

        this.router.navigate(["/mantenimiento-pagina"]);

      });

    }

  }

}
