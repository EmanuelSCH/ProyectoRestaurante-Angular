import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../Services/persona.service';
@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {
  usuario: FormGroup;
  parametro: string = "";
  titulo: string = "";
  tipoUsuarios: any;
  personas: any;
  ver: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private personaService: PersonaService,
    private router: Router) {

    this.usuario = new FormGroup(
      {
        'iidusuario': new FormControl("0"),
        'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.noRepetirUsuario.bind(this)),
        'contra': new FormControl("", [Validators.required, Validators.maxLength(100)]),
        'contra2': new FormControl("", [Validators.required, Validators.maxLength(100), this.validarContraIguales.bind(this)]),
        'iidPersona': new FormControl("", [Validators.required]),
        'iidTipousuario': new FormControl("", [Validators.required
          ])
      }

    );

    this.activatedRoute.params.subscribe(param => {

      this.parametro = param["id"]

      if (this.parametro == "nuevo") {

        this.ver = true;

      } else {

        this.ver = false;
        this.usuarioService.recuperarUsuario(this.parametro).subscribe(data => {

          this.usuario.controls["iidusuario"].setValue(data["iidusuario"]);
          this.usuario.controls["nombreusuario"].setValue(data["nombreusuario"]);
          this.usuario.controls["iidTipousuario"].setValue(data["iidTipousuario"]);


          this.usuario.controls["contra"].setValue("1");
          this.usuario.controls["contra2"].setValue("1");
          this.usuario.controls["iidPersona"].setValue("1");
        })
      }

    });

  }

  ngOnInit() {

    this.usuarioService.getTipoUsuario().subscribe(data => {
      this.tipoUsuarios = data;
    })

    this.personaService.listarPersonaCombo().subscribe(data => {
      this.personas = data;

    })

    if (this.parametro == "nuevo") {
      this.titulo = "Agregar Usuario";
    } else {
      this.titulo = "Editar Usuario";
    }
  }

  validarContraIguales(control: FormControl) {

    if (control.value != "" && control.value != null) {

      if (this.usuario.controls["contra"].value != control.value) {
        return { noIguales: true };
      } else {
        return null;
      }

    }

  }

  noRepetirUsuario(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.usuarioService.validarUsuario(this.usuario.controls["iidusuario"].value, control.value)
          .subscribe(data => {

            if (data == 1) {
              resolve({ yaExiste: true });
            } else {
              resolve(null);
            }

          })
      }


    });

    return promesa;

  }


  guardarDatos() {

    if (this.usuario.valid == true) {
      this.usuarioService.guardarDatos(this.usuario.value).subscribe(res => {
        this.router.navigate(["/mantenimiento-usuario"]);
      })
    }

  }

}
