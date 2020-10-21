import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {


  isExpanded = false;
  login: boolean = false;
  menus: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(){

    this.usuarioService.obtenerSession().subscribe(data => {

      if (data) {
        this.login = true;
        //Llamar a listar paginas
        this.usuarioService.listarPaginas().subscribe(dato => {

          this.menus = dato;

        });
      }
      else
      {
        this.login = false;
        this.router.navigate(["/login"]);
      }

    })
  }

  cerrarSesion() {

    this.usuarioService.cerrarSesion().subscribe(res => {

      if (res["valor"] == "OK") {
        this.login = false;
        this.router.navigate(["/login"]);
      }

    })
  }

}
