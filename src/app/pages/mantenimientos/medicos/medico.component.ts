import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';

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
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalesService) { }


  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre:['Andres', Validators.required],
      hospital:['', Validators.required]
    })
    this.cargarHospitales()
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId=>{
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)!;
      console.log(this.hospitalSeleccionado)
    })
  }

  guardarMedico(){
    console.log(this.medicoForm.value)
  }
  cargarHospitales(){
    this.hospitalService.getHospitales().subscribe(({hospitales})=>{
      this.hospitales = hospitales;
    })
  }

}
