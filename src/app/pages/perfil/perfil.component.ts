import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/user.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public profileForm!: FormGroup;
  public usuario!: Usuario;
  public imageToUpload: File | null | undefined;
  public imgTemp: any = '';
  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }
  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (res) => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire({
          title: '💾',
          text: 'Usuario editado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: err.error.msj,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  changeImage(event: EventTarget) {
    this.imageToUpload = (event as HTMLInputElement).files![0];

    if (!this.imageToUpload) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }
  updateImage() {
    this.fileUploadService
      .updatePhoto(this.imageToUpload!, 'usuarios', this.usuario.uid!)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire({
          title: '👤',
          text: 'Imagen de usuario actualizada',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });
  }
}
