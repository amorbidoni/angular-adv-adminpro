import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public profileForm!: FormGroup;
  public usuario!: Usuario;
  constructor(private fb: FormBuilder, private userService: UsuariosService) {
    this.usuario = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }
  updateProfile() {
    console.log(this.profileForm.value);
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
      }
    );
  }
}
