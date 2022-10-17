import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu =[]
  getMenu(){
    this.menu =  JSON.parse(localStorage.getItem('menu')!) || [];
  }







  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     subMenu: [
  //       {
  //         title: 'Main',
  //         routerLink: '/',
  //       },
  //       {
  //         title: 'Progressbar',
  //         routerLink: './progress',
  //       },
  //       {
  //         title: 'Graphics',
  //         routerLink: './grafica1',
  //       },
  //       {
  //         title: 'Promises',
  //         routerLink: './promises',
  //       },
  //       {
  //         title: 'RXJS',
  //         routerLink: './rxjs',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     subMenu: [
  //       {
  //         title: 'Usuarios',
  //         routerLink: './usuarios',
  //       },
  //       {
  //         title: 'Hospitales',
  //         routerLink: './hospitales',
  //       },
  //       {
  //         title: 'Medicos',
  //         routerLink: './medicos',
  //       },
  //     ],
  //   },
  // ];
}
