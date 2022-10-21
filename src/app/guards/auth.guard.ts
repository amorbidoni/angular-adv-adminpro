import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UsuariosService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]):Observable<boolean>  {
    return this.userService.validatToken().pipe(
      tap((isAutenticated) => {
        if (!isAutenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.userService.validatToken().pipe(
      tap((isAutenticated) => {
        if (!isAutenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
