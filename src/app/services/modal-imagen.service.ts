import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  
  private _ocultarModal:boolean = true
  public tipo!:'usuarios'| 'medicos'| 'hospitales';
  public id!:string;
  public img:string='no-image'; 
  public newImage :EventEmitter<string> = new EventEmitter<string>()
  get ocularmodal(){
    return this._ocultarModal;
  }

  abrirModal(
              tipo:'usuarios'| 'medicos'| 'hospitales', 
              id:string, 
              img:string
              ){
                this._ocultarModal = false
                this.id   = id;
                this.tipo = tipo;
                this.img  = img;
                if(img.includes('https')){
                  this.img  = img;
                }else{
                  this.img = `${base_url}/uploads/${tipo}/${img}`
                }
              }  
  cerrarModal(){
    this._ocultarModal = true
  }  
  constructor() { }
}
