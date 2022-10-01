import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//
import { RegisterForm, LoginForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/user.model';
//
const base_url = environment.base_url;

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient, private router: Router) {}

  public user!: Usuario;
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user.uid || '';
  }
  login(formData: LoginForm) {
    const _url: string = `${base_url}/login`;
    return this.http.post(_url, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginGoogle(token: string) {
    const _url: string = `${base_url}/login/google`;
    return this.http.post(_url, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
    if (this.user.google) {
      google.accounts.id.revoke('morbidoniandres@gmail.com', () => {
        this.router.navigateByUrl('/login');
      });
    }
    this.router.navigateByUrl('/login');
  }

  validatToken(): Observable<boolean> {
    const _url: string = `${base_url}/login/renew`;
    return this.http.get(_url, { headers: { 'x-token': this.token } }).pipe(
      map((res: any) => {
        const { nombre, email, role, google, uid, img = '' } = res.usuario;
        this.user = new Usuario(nombre, email, '', img, google, uid, role);
        localStorage.setItem('token', res.token);
        return true;
      }),

      // El pipe of de rxjs es para devolver un observable del valor que le paso (en este caso un booleano) y respetamos asi lo que devuelve la funcion.
      catchError((err: any) => of(false))
    );
  }

  //
  crearUsuario(formData: RegisterForm) {
    const _url: string = `${base_url}/usuarios`;

    return this.http.post(_url, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
  // actualizar usuario\

  updateProfile(data: { nombre: string; email: string; role: string }) {
    data = { ...data, role: this.user.role! };
    const _url: string = `${base_url}/usuarios/${this.uid}`;
    console.log(this.user);
    return this.http.put(_url, data, { headers: { 'x-token': this.token } });
  }
}
