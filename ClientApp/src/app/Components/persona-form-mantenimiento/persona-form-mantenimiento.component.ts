import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../Services/persona.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {

  persona: FormGroup;
  titulo: string ="";
  parametro: string;

  constructor(private personaService: PersonaService, private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.persona = new FormGroup(
      {
        'iidpersona': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
        'apPaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'apMaterno': new FormControl("", [Validators.maxLength(150)]),
        'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
        'correo': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")], this.noRepetirCorreoInsertar.bind(this)),
        'fechaNacimiento': new FormControl("", Validators.required)
      }
    );

    this.activatedRoute.params.subscribe(parametro => {

      this.parametro = parametro["id"]
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando una nueva persona";
      } else {
        this.titulo = "Editando una persona";
      }

    });

  }

  ngOnInit() {

    if (this.parametro != "nuevo") {

      this.personaService.recuperarPersona(this.parametro).subscribe(param => {

        this.persona.controls["iidpersona"].setValue(param["iidpersona"]);
        this.persona.controls["nombre"].setValue(param["nombre"]);
        this.persona.controls["apPaterno"].setValue(param["apPaterno"]);
        this.persona.controls["apMaterno"].setValue(param["apMaterno"]);
        this.persona.controls["telefono"].setValue(param["telefono"]);
        this.persona.controls["correo"].setValue(param["correo"]);
        this.persona.controls["fechaNacimiento"].setValue(param["fechaCadena"]);

      });

    }

  }

  guardarDatos() {

    if (this.persona.valid == true) {

      var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
      var anio = fechaNac[0];
      var mes = fechaNac[1];
      var dia = fechaNac[2];

      this.persona.controls["fechaNacimiento"].setValue(mes + "/" + dia + "/" + anio);

        this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.router.navigate(["/mantenimiento-persona"]) });

    }

  }

  noRepetirCorreoInsertar(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.personaService.validarCorreo(this.persona.controls["iidpersona"].value, control.value)
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

  

}
