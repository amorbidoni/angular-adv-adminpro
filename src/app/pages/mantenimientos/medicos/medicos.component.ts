import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { MedicosService } from '../../../services/medicos.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos : Medico[] = [];
  public medicosTemp : Medico[] = [];
  public loading:boolean = true;
  public totalMedicos: number = 0; 
  public fromData:number = 0;
  private imageSubscription!:Subscription; 
  constructor(private medicosService    : MedicosService,
              private busquedasService  : BusquedasService,
              private modalImagenService: ModalImagenService
              ) { }
  ngOnDestroy() {
    this.imageSubscription.unsubscribe()
  }

  ngOnInit() {
    this.getMedicos()
    this.imageSubscription = this.modalImagenService.newImage
                                 .pipe(delay(1000))
                                 .subscribe(res=>this.getMedicos())
  }
  
  getMedicos(){
    this.loading = true;
    
    this.medicosService.getMedicos().subscribe(res=>{
      this.medicos = res.medicos;
      this.medicosTemp =res.medicos;
      this.totalMedicos = res.total;
      this.loading = false;
    })
  }
  eliminarMedico(medico:Medico){
    Swal.fire({
      title: 'Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.value){
        this.medicosService.deleteMedico(medico._id!).subscribe(res=>{
          this.getMedicos()  
          Swal.fire(
              'Médico borrado.',
              `El médico ${medico.nombre} se eliminó correctamente.`,
              'success'
            )
        })
      }
    })
    return
  }
  // SEARCH 
  search(termino: string) {
    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedasService.search('medicos', termino)
        .subscribe((medicos) => {
            this.medicos = medicos as Medico[];
          });
  }  

  // actualizar imagen 
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img!)
  }
}
