import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuariosService
  ) {}

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '982863883085-mhvrau58pdsc96qkd7458oautp622r6i.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }
  renderGoogleButton() {}
  handleCredentialResponse(response: any) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    this.userService.loginGoogle(response.credential).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }
  ngOnInit(): void {}

  public loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    rememberme: [localStorage.getItem('rememberme') === 'true'],
  });

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        let rememberme = this.loginForm.get('rememberme')!.value;
        rememberme &&
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        localStorage.setItem('rememberme', rememberme.toString());
        this.router.navigateByUrl('/');
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
