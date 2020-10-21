import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class UsuarioService {

  urlBase: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private router: Router) {

    this.urlBase = baseUrl;

  }

  public getUsuario() {

    return this.http.get(this.urlBase + "api/Usuario/listarUsuario");

  }

  public getTipoUsuario() {

    return this.http.get(this.urlBase + "api/Usuario/listarTipoUsuario");

  }

  public getFiltrarUsuarioPorTipo(idTipo) {

    return this.http.get(this.urlBase + "api/Usuario/filtrarUsuarioPorTipo/" + idTipo);

  }

  public validarUsuario(idUsuario, nombre) {

    return this.http.get(this.urlBase + "api/Usuario/validarUsuario/" + idUsuario + "/" + nombre);
  }

  public recuperarUsuario(idUsuario) {

    return this.http.get(this.urlBase + "api/Usuario/recuperarUsuario/" + idUsuario);
  }

  public guardarDatos(usuarioCLS) {
    return this.http.post(this.urlBase + "api/Usuario/guardarDatos", usuarioCLS);
  }

  public eliminarUsuario(idUsuario) {

    return this.http.get(this.urlBase + "api/Usuario/eliminarUsuario/" + idUsuario);

  }

  public login(usuario) {

    return this.http.post(this.urlBase + "api/Usuario/login", usuario)

  }

  public obtenerVariableSession(next) {

    return this.http.get("api/Usuario/obtenerVariableSession").pipe(map(res => {

      var data = res;
      var inf = data["valor"];
      if (inf == "") {
        this.router.navigate(["/pagina-error"]);
        return false;
      } else {
        var pagina = next["url"][0].path;
        if (data["lista"] != null) {
          console.log(next);
          var paginas = data["lista"].map(pagina => pagina.accion);
          if (paginas.indexOf(pagina) > -1 && pagina != "login") {
            return true;
          } else {
            this.router.navigate(["/pagina-error-permiso"]);
            return false;

          }
        }

        return true;
      }


    }));

  }

  public listarPaginas() {

    return this.http.get(this.urlBase + "api/Usuario/listarPaginas");

  }

  public obtenerSession() {

    return this.http.get("api/Usuario/obtenerVariableSession").pipe(map(res => {

      var data = res;
      var inf = data["valor"];
      if (inf == "") {
        return false;
      } else {
        return true;
      }


    }));

  }

  public cerrarSesion() {

    return this.http.get("api/Usuario/cerrarSesion");

  }

  public listarTipoUsuarios() {

    return this.http.get(this.urlBase + "api/TipoUsuario/listarTipoUsuarios");

  }

  public listarPaginasTipoUsuario() {

    return this.http.get(this.urlBase + "api/TipoUsuario/listarPaginasTipoUsuario");

  }

  public listarPaginasRecuperar(iidTipoUsuario) {

    return this.http.get(this.urlBase + "api/TipoUsuario/listarPaginasRecuperar/" + iidTipoUsuario);

  }

  public guardarDatosTipoUsuario(tipoUsuarioCLS) {

    return this.http.post(this.urlBase + "api/TipoUsuario/guardarDatosTipoUsuario", tipoUsuarioCLS);

  }

  public eliminarTipoUsuario(iidTipoUsuario) {

    return this.http.get(this.urlBase + "api/TipoUsuario/eliminarTipoUsuario/{iidTipoUsuario}" + iidTipoUsuario);

  }

  public listarPaginasBD() {

    return this.http.get("api/Pagina/listarPaginasBD");
  }

  public guardarPagina(paginaCLS) {

    return this.http.post(this.urlBase + "api/Pagina/guardarPagina", paginaCLS);

  }

  public recuperarPagina(idPagina) {

    return this.http.get("api/Pagina/recuperarPagina/" + idPagina);
  }

  public eliminarPagina(idPagina) {

    return this.http.get("api/Pagina/eliminarPagina/" + idPagina);
  }

}
