import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriaComponent } from './Components/buscador-producto-categoria/buscador-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './Components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './Components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './Components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltradoPersonaNombreCompletoComponent } from './Components/filtrado-persona-nombre-completo/filtrado-persona-nombre-completo.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './Components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './Components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './Components/tabla-usuario/tabla-usuario.component';


import { ProductoService } from './services/producto.service';
import { UsuarioService } from './services/usuario.service';
import { CategoriaService } from './services/categoria.service';
import { PersonaService } from './Services/persona.service';

import { MantenimientoPersonaComponent } from './Components/mantenimiento-persona/mantenimiento-persona.component';
import { PersonaFormMantenimientoComponent } from './Components/persona-form-mantenimiento/persona-form-mantenimiento.component';
import { MantenimientoProductoComponent } from './Components/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoFormMantenimientoComponent } from './Components/producto-form-mantenimiento/producto-form-mantenimiento.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoUsuarioComponent } from './Components/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuarioFormMantenimientoComponent } from './Components/usuario-form-mantenimiento/usuario-form-mantenimiento.component';
import { LoginComponent } from './Components/login/login.component';
import { SeguridadGuard } from './Components/guards/seguridad.guard';
import { PaginaErrorLoginComponent } from './Components/pagina-error-login/pagina-error-login.component';
import { PermisoErrorPaginaComponent } from './Components/permiso-error-pagina/permiso-error-pagina.component';
import { ComponenteBienvenidaComponent } from './Components/componente-bienvenida/componente-bienvenida.component';
import { TablaCategoriaComponent } from './Components/tabla-categoria/tabla-categoria.component';
import { MantenimientoTipoUsuarioComponent } from './Components/mantenimiento-tipo-usuario/mantenimiento-tipo-usuario.component';
import { TipoUsuarioFormMantenimientoComponent } from './Components/tipo-usuario-form-mantenimiento/tipo-usuario-form-mantenimiento.component';
import { TablaTipoUsuarioComponent } from './Components/tabla-tipo-usuario/tabla-tipo-usuario.component';
import { TablaPaginaComponent } from './Components/tabla-pagina/tabla-pagina.component';
import { MantenimientoPaginaComponent } from './Components/mantenimiento-pagina/mantenimiento-pagina.component';
import { PaginaFormMantenimientoComponent } from './Components/pagina-form-mantenimiento/pagina-form-mantenimiento.component';
import { NoEncontroInformacionComponent } from './Components/no-encontro-informacion/no-encontro-informacion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltradoPersonaNombreCompletoComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MantenimientoPersonaComponent,
    PersonaFormMantenimientoComponent,
    MantenimientoProductoComponent,
    ProductoFormMantenimientoComponent,
    MantenimientoUsuarioComponent,
    UsuarioFormMantenimientoComponent,
    LoginComponent,
    PaginaErrorLoginComponent,
    PermisoErrorPaginaComponent,
    ComponenteBienvenidaComponent,
    TablaCategoriaComponent,
    MantenimientoTipoUsuarioComponent,
    TipoUsuarioFormMantenimientoComponent,
    TablaTipoUsuarioComponent,
    TablaPaginaComponent,
    MantenimientoPaginaComponent,
    PaginaFormMantenimientoComponent,
    NoEncontroInformacionComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'filtradoProductoCategoria', component: FiltradoProductoCategoriaComponent, canActivate: [SeguridadGuard] },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent, canActivate: [SeguridadGuard] },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'tabla-producto', component: TablaProductoComponent },
      { path: 'filtradoPersonaNombreCompleto', component: FiltradoPersonaNombreCompletoComponent, canActivate: [SeguridadGuard]  },
      { path: 'filtradoUsuarioTipo', component: FiltradoUsuarioTipoUsuarioComponent, canActivate: [SeguridadGuard]  },
      { path: 'mantenimiento-persona', component: MantenimientoPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'persona-form-mantenimiento/:id', component: PersonaFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'producto-form-mantenimiento/:id', component: ProductoFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-usuario', component: MantenimientoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'usuario-form-mantenimiento/:id', component: UsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'pagina-error', component: PaginaErrorLoginComponent },
      { path: 'pagina-error-permiso', component: PermisoErrorPaginaComponent },
      { path: 'componente-bienvenida', component: ComponenteBienvenidaComponent },
      { path: 'mantenimiento-tipoUsuario', component: MantenimientoTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'tipoUsuario-form-mantenimiento/:id', component: TipoUsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-pagina', component: MantenimientoPaginaComponent, canActivate: [SeguridadGuard] },
      { path: 'pagina-form-mantenimiento/:id', component: PaginaFormMantenimientoComponent, canActivate: [SeguridadGuard]},
      { path: 'no-encontro-informacion', component: NoEncontroInformacionComponent }
    ])
  ],
  providers: [PersonaService, CategoriaService, UsuarioService, ProductoService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
