import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios   : Usuario [] = [];
  public hospitales : Hospital[] = [];
  public medicos    : Medico  [] = [];
  constructor(private activatedRoute : ActivatedRoute,
              private busquedasService: BusquedasService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({termino})=>this.globalSearch(termino))
  }



  globalSearch(termino:string){
    this.busquedasService.globalSearch(termino).subscribe((res:any)=>{
      this.usuarios   = res.usuarios;
      this.medicos     = res.medicos;
      this.hospitales = res.hospitales;
      
    })
  }

}
