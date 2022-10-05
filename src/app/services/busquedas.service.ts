import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';
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
  private transformarHospital(resultados: any[]): Hospital[] {
    return resultados.map(
      (hospital) =>
        new Hospital(
          hospital.nombre,
          hospital._id,
          hospital._hospitalUser,
          hospital.img
        )
    );
  }
  private transformarMedico(resultados: any[]): Medico[] {
    return resultados.map(
      (medico) =>
        new Medico(
          medico.nombre,
          medico._id,
          medico.img,
          medico.usuario,
          medico.hospital
        )
    );
  }
  search(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = ''): Observable<Usuario[] | Hospital[] | Medico[] | undefined> {
    const _url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get(_url, this.headers).pipe(
      map((res: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(res.resultado);
          case 'hospitales':
            return this.transformarHospital(res.resultado);
          case 'medicos':
            return this.transformarMedico(res.resultado);
          default:
            return;
        }
      })
    );
  }
}
