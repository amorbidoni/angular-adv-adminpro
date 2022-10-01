import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm, LoginForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient, private router: Router) {}
  crearUsuario(formData: RegisterForm) {
    const _url: string = `${base_url}/usuarios`;

    return this.http.post(_url, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
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

    google.accounts.id.revoke('morbidoniandres@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });

    this.router.navigateByUrl('/login');
  }

  validatToken(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';
    const _url: string = `${base_url}/login/renew`;
    return this.http.get(_url, { headers: { 'x-token': token } }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map((res) => true),
      // El pipe of de rxjs es para devolver un observable del valor que le paso (en este caso un booleano) y respetamos asi lo que devuelve la funcion.
      catchError((err: any) => of(false))
    );
  }
}
