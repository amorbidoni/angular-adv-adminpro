import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private route: Router
  ) {}
  public formSumitted: boolean = false;
  public registerForm: FormGroup = this.fb.group(
    {
      nombre: ['Pedro', [Validators.required, Validators.minLength(3)]],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    },
    {
      validators: this.confirmedPassword('password', 'password2'),
    }
  );

  addUSer() {
    this.formSumitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.crearUsuario(this.registerForm.value).subscribe(
        (res) => {
          this.route.navigateByUrl('/login');
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: err.error.msj,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)!.invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos(): boolean {
    return !this.registerForm.get('terms')!.value && this.formSumitted;
  }
  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;
    if (pass1 !== pass2 && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  // ESTE TIPO DE FUNCION NO SE USA MAS PARA VALIDACIONES PERSONALIZADAS ↓

  // passwordsIguales(pass1Name: string, pass2Name: string) {
  //   return (formGroup: FormGroup) => {
  //     const pass1Controll = formGroup.get(pass1Name);
  //     const pass2Controll = formGroup.get(pass2Name);
  //     if (pass1Controll!.value === pass2Controll!.value) {
  //       pass2Controll?.setErrors(null);
  //     } else {
  //       pass2Controll?.setErrors({
  //         noEsIgual: true,
  //       });
  //     }
  //   };
  // }
  confirmedPassword(controlName: string, matchingControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.get(controlName);
      const matchingInput = control.get(matchingControlName);

      if (input === null || matchingInput === null) {
        return null;
      }

      if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
        return null;
      }

      if (input.value !== matchingInput.value) {
        matchingInput.setErrors({ confirmedValidator: true });
        return { confirmedValidator: true };
      } else {
        matchingInput.setErrors(null);
        return null;
      }
    };
  }
  ngOnInit(): void {}
}
