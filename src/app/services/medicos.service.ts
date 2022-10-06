import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { MedicosResult } from '../interfaces/getMedicosReslt.interface';
import { map } from 'rxjs/operators';


const baseUrl = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http : HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  getMedicos(from?:string):Observable<MedicosResult>{
    let _url = `${baseUrl}/medicos`;
    if(from) _url += `?desde=${from}`;

    return this.http.get<MedicosResult>(_url, this.headers)
                    .pipe(
                        map( (res )=> {
                          const medicos = res.medicos.map(
                                          (medico)=> new Medico(
                                                                medico.nombre,
                                                                medico._id,
                                                                medico.img,
                                                                medico.usuario,
                                                                medico.hospital
                                                                ))
                                            
                          return { ok:res.ok,  total:res.total, medicos}
                          }) 
                        )                 
  }
  addMedico(medico: {nombre:string, hospitalId:string}):Observable<{ok:boolean, medico:Medico}>{
    const _url =`${baseUrl}/medicos`

    return this.http.post<{ok:boolean, medico:Medico}>(_url,  medico, this.headers);
  }

  updateMedico(medico:Medico){
    const _url =`${baseUrl}/medicos/${medico._id}`

    return this.http.put(_url, medico, this.headers)
  }
  
  deleteMedico( _id:string){
    const _url =`${baseUrl}/medicos/${_id}`

    return this.http.delete(_url, this.headers)
  }
  
  getMedicoById(_id:string):Observable<Medico>{
    const _url = `${baseUrl}/medicos/${_id}`;

    return this.http.get<{ok:boolean, medico:Medico}>(_url, this.headers)
                    .pipe(
                      map(res => res.medico)
                    );
  }
}
