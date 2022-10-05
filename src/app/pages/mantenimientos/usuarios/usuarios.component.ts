import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/user.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: Usuario[] = [];
  public usersTemp: Usuario[] = [];
  public fromPage: number = 0;
  public loading: boolean = true;
  public termino: String = '';
  public imagenSubscription!:Subscription
  constructor(
    private userService: UsuariosService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService
  ) {}
  ngOnDestroy() {this.imagenSubscription.unsubscribe()}

  ngOnInit() {
   this.getUsers();
   this.imagenSubscription= this.modalImagenService.newImage
        .pipe(delay(1000))
        .subscribe(img =>this.getUsers())
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
    this.busquedasService.search('usuarios', termino)
                         .subscribe((res) => {
                             this.users = res as Usuario[];
                       });
  }

  deleteUser(usuario:Usuario){
    if(usuario.uid === this.userService.uid){ return Swal.fire('Error','No puede borrarse a si mismo', 'error')}
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.value){
      this.userService.deleteUser(usuario).subscribe(res=>{
        this.getUsers()  
        Swal.fire(
          'Usuario borrado.',
          `El usuario ${usuario.nombre} se eliminó correctamente.`,
          'success'
          )
          
        })
      }
    })
    return
  }


  cambiarRole(user:Usuario){
  
    this.userService.updateUser(user).subscribe(res=>{
      console.log(res)
    }, err=>{
      Swal.fire('Error', err.error.msj, 'error' )
    })
   }
   
   abrirModal(user:Usuario){
    this.modalImagenService.abrirModal('usuarios', user.uid!, user.img!)
   }
   
}
