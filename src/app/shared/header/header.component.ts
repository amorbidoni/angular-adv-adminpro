import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user!: Usuario;
  constructor(private userService: UsuariosService) {
    this.user = userService.user;
  }
  logOut() {
    this.userService.logOut();
  }
}
