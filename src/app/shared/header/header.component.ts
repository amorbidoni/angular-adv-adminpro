import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user!: Usuario;
  constructor(private userService : UsuariosService,
              private router : Router) {
    this.user = userService.user;
  }
  logOut() {
    this.userService.logOut();
  }
  buscar(termino:string){
    if(termino.length === 0)return;
    this.router.navigateByUrl(`/dashboard/busquedas/${termino}`);
  }
}
