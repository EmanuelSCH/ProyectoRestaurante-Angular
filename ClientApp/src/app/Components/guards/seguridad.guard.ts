import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
@Injectable()
export class SeguridadGuard implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService) {


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.usuarioService.obtenerVariableSession(next);
  }
}
