import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];

  public user!: Usuario;
  constructor(
    private sidebarService: SidebarService,
    private userService: UsuariosService
  ) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
  }
  ngOnInit(): void {}
}
