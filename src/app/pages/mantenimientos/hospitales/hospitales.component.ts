import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales     :Hospital[] = [];
  public hospitalesTemp :Hospital[] = [] 
  public loading   :boolean   = true;
  public fromPage  :number    = 0;
  public totalHospitals:number = 0; 
  private _imageSubscription!:Subscription;
  constructor(private hospitalesService:HospitalesService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

// 
  ngOnInit(): void {
    this.getHospitals()
    this._imageSubscription = this.modalImagenService.newImage
                                  .pipe(delay(1000))
                                  .subscribe(res=>this.getHospitals())
  }
  // 
  ngOnDestroy() {
    this._imageSubscription.unsubscribe()  
  }
  // 
  changePage(value: number) {
    this.fromPage += value;
    if (this.fromPage < 0) {
      this.fromPage = 0;
    } else if (this.fromPage > this.totalHospitals) {
      this.fromPage -= value;
    }
    this.getHospitals();
  }
  getHospitals(){
    this.loading = true;
    this.hospitalesService.getHospitales(this.fromPage)
        .subscribe(res=>{
          this.hospitales = res.hospitales;
          this.hospitalesTemp = res.hospitales;
          this.loading    = false;
          this.totalHospitals = res.total;
            })

  }
  guardarCambios(hospital:Hospital){
    this.hospitalesService.updateHospital(hospital.nombre, hospital._id!).subscribe(res=>{
      Swal.fire('Hospital actualizado', 
                `El hospital ${hospital.nombre} fue actualizado`, 
                'success'
      )
      this.getHospitals()
    })
  }
  deleteHospital(hospital:Hospital){
    this.hospitalesService.deleteHospital(hospital._id!).subscribe(res=>{
      Swal.fire('Hospital eliminado', 
                `${hospital.nombre} eliminado de la base de datos.`, 
                'success'
      )
      this.getHospitals()
    })
  }
  async openSweetAlertModal(){
    const {value} = await Swal.fire<string>({
      title:'Crear Hospital',
      html:'Ingrese el NOMBRE del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton:true,
      confirmButtonText:'Crear Hospital'
    })
    
    if ( value && value.trim().length > 0) {
      this.hospitalesService.addHospital(value).subscribe((res:any)=>{
        this.hospitales.push({...res.hospital, img:'no-image'});
        Swal.fire(`Hospital creado`, `${value} fue creado correctamente.`)
      })
    }
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img!)
  }

  // SEARCH 
  search(termino: string) {
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedasService.search('hospitales', termino)
        .subscribe((hospitales) => {
            this.hospitales = hospitales as Hospital[];
          });
  }
}
