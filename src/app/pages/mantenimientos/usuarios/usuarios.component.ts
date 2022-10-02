import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/user.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public totalUsers: number = 0;
  public users: Usuario[] = [];
  public usersTemp: Usuario[] = [];
  public fromPage: number = 0;
  public loading: boolean = true;
  public termino: String = '';
  constructor(
    private userService: UsuariosService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit() {
    this.getUsers();
  }
  changePage(value: number) {
    this.fromPage += value;
    if (this.fromPage < 0) {
      this.fromPage = 0;
    } else if (this.fromPage > this.totalUsers) {
      this.fromPage -= value;
    }
    this.getUsers();
  }
  getUsers() {
    this.loading = true;
    this.userService
      .getUsers(this.fromPage)
      .subscribe(({ total, usuarios }) => {
        this.totalUsers = total;
        this.users = usuarios;
        this.usersTemp = usuarios;
        this.loading = false;
      });
  }
  search(termino: string) {
    if (termino.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this.busquedasService.search('usuarios', termino).subscribe((res) => {
      this.users = res!;
    });
  }
}
