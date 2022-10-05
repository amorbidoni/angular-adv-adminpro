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
  getMedicos():Observable<MedicosResult>{
    const _url = `${baseUrl}/medicos`;
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
  addMedico(nombre:string, hospitalId:string = ''){
    const _url =`${baseUrl}/medicos`

    return this.http.post(_url,  {nombre, hospital:hospitalId}, this.headers)
  }

  updateMedico(medico:Medico, _id:string){
    const _url =`${baseUrl}/medicos/${_id}`

    return this.http.put(_url, medico, this.headers)
  }
  
  deleteMedico( _id:string){
    const _url =`${baseUrl}/medicos/${_id}`

    return this.http.delete(_url, this.headers)
  }
}
