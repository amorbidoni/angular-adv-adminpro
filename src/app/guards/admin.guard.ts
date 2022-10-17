import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuariosService: UsuariosService,
              private router: Router  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.usuariosService.role === 'ADMIN_ROLE'){
        return true
      }else{
        this.router.navigateByUrl('dashboard');
        return  false;
      }
  }
  
}
