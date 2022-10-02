import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/user.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.uid,
          user.role
        )
    );
  }
  search(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const _url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get(_url, this.headers).pipe(
      map((res: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(res.resultado);

          default:
            return;
        }
      })
    );
  }
}
