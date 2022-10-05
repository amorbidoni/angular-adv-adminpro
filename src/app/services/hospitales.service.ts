import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HospitalResult } from '../interfaces/getHospitalsResult.interface';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  constructor(private http :HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  getHospitales(from?:number):Observable<HospitalResult>{
    console.log(from)
    let _url = `${base_url}/hospitales`;    
    if(from)   _url += `?desde=${from}`;
     
    return this.http.get<HospitalResult>(_url, this.headers);
            
  }

  addHospital(nombre:string){
    const _url =`${base_url}/hospitales`

    return this.http.post(_url, { nombre }, this.headers)
  }

  updateHospital(nombre:string, _id:string){
    const _url =`${base_url}/hospitales/${_id}`

    return this.http.put(_url, { nombre }, this.headers)
  }
  
  deleteHospital( _id:string){
    const _url =`${base_url}/hospitales/${_id}`

    return this.http.delete(_url, this.headers)
  }

}
