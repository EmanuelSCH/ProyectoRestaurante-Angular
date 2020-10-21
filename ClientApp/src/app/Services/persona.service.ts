import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class PersonaService {

  urlBase: string;

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {

    this.urlBase = baseUrl;

  }


  public getPersona() {

    return this.http.get(this.urlBase + "api/Persona/listarPersonas");

  }

  public getPersonaFiltro(nombreCompleto) {

    return this.http.get(this.urlBase + "api/persona/filtrarPersona/" + nombreCompleto);

  }

  public agregarPersona(persona) {
    var url = this.urlBase + "api/Persona/guardarPersona";
    return this.http.post(url, persona);

  }

  public recuperarPersona(idPersona) {

    return this.http.get(this.urlBase + ("api/Persona/recuperarPersona/" + idPersona))

  }

  public eliminar(idPersona) {

    return this.http.get(this.urlBase + "api/Persona/eliminarPersona/" + idPersona)

  }

  public validarCorreo(id,correo) {

    return this.http.get(this.urlBase + "api/Persona/validarCorreo/"+id+"/"+correo);

  }

  public listarPersonaCombo() {

    return this.http.get(this.urlBase + "api/Persona/listarPersonaCombo")

  }

}
