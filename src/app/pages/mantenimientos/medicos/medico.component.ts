import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalesService } from '../../../services/hospitales.service';
import { MedicosService } from '../../../services/medicos.service';
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm!:FormGroup; 
  public hospitales: Hospital[] = []
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;
  constructor(private fb: FormBuilder,
              private hospitalService : HospitalesService,
              private medicosService : MedicosService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(){

    this.activatedRoute.params.subscribe(( { id } )=>this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre:['', Validators.required],
      hospital:['', Validators.required]
    })
    this.cargarHospitales()
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId=>{
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)!;
    })
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;
    if(this.medicoSeleccionado){
      const data = {
        ...this.medicoForm.value,
        _id : this.medicoSeleccionado._id
      }
      this.medicosService.updateMedico(data).subscribe(res=>{
          Swal.fire('Médico actualizado', `Médico ${ nombre } actualizado correctamente.`, 'success');
      })
    }else{
      this.medicosService.addMedico(this.medicoForm.value).subscribe((res)=>{
           Swal.fire('Médico creado', `Médico ${ nombre } creado correctamente.`, 'success');
           this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }
  
  cargarHospitales(){
    this.hospitalService.getHospitales().subscribe(({hospitales})=>{
      this.hospitales = hospitales;
    })
  }
  cargarMedico(id:string){
    
    if(id === 'nuevo') return;

    this.medicosService.getMedicoById(id)
                       .pipe(delay(100))  
                       .subscribe(medico=>{
                        console.log(medico)
                        if(!medico){
                          this.router.navigateByUrl(`/dashboard/medicos`);
                        }
                        const {nombre, hospital } = medico;
                        const { _id } = hospital!;
                        this.medicoForm.setValue({nombre, hospital : _id});
                        this.medicoSeleccionado = medico;

                      }, err=>{
                         this.router.navigateByUrl(`/dashboard/medicos`);
                      })
  }

}
