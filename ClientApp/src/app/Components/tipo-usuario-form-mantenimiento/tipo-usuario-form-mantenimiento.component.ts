import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  parametro: string;
  titulo: string;

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.tipoUsuario = new FormGroup({

      "iidtipousuario": new FormControl(""),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "descripcion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "valores": new FormControl("")
    });

    this.activatedRoute.params.subscribe(param => {

      this.parametro = param["id"];
      if (this.parametro == "nuevo") {

        this.titulo = "Agregar un tipo Usuario"

      } else {

        this.titulo = "Editar un tipo Usuario"

      }

    })

    this.usuarioService.listarPaginasTipoUsuario().subscribe(data => {
      this.paginas = data;
    })

  }

  ngOnInit() {

    if (this.parametro != "nuevo") {

      this.usuarioService.listarPaginasRecuperar(this.parametro).subscribe(res => {

        this.tipoUsuario.controls["iidtipousuario"].setValue(res["iidtipousuario"]);
        this.tipoUsuario.controls["nombre"].setValue(res["nombre"]);
        this.tipoUsuario.controls["descripcion"].setValue(res["descripcion"]);

        var listaPaginas = res["listaPagina"].map(p => p.iidpagina);

        //pintar la información

        setTimeout(() => {

          var checks = document.getElementsByClassName("check");
          var ncheck = checks.length;
          var check;
          for (var i = 0; i < ncheck; i++) {

            check = checks[i];
            var indice = listaPaginas.indexOf(check.name * 1);
            if (indice > -1) {

              check.checked = true; 

            }

          }

        }, 500);

      });

    }

  }

  guardarDatos() {

    if (this.tipoUsuario.valid == true) {

      this.usuarioService.guardarDatosTipoUsuario(this.tipoUsuario.value).subscribe(res => {

        this.router.navigate(["/mantenimiento-tipoUsuario"]);

      })


    }


  }

  verCheck() {

    var seleccionados = "";
    var checks = document.getElementsByClassName("check");
    var check;
    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked == true) {
        seleccionados += check.name;
        seleccionados += "$";
      }
    }

    if (seleccionados != "") seleccionados = seleccionados.substring(0, seleccionados.length - 1)

    this.tipoUsuario.controls["valores"].setValue(seleccionados);

  }

}
