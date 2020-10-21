import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriaService {

  urlbase: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.urlbase = baseUrl;

  }

  public getCategoria() {


    return this.http.get(this.urlbase + "api/Categoria/listarCategorias");
  }


}

