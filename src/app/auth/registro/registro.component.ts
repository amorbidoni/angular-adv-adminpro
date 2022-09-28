import { Component, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder) {}
  public formSumitted: boolean = false;
  public registerForm = this.fb.group(
    {
      nombre: ['Pedro', [Validators.required, Validators.minLength(3)]],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.required]],
    },
    {
      validators: this.confirmedPassword('password', 'password2'),
    }
  );

  addUSer() {
    this.formSumitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      console.log('Posteando formulario');
    } else {
      console.log('Formulario incorrecto');
      console.log(this.registerForm);
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
