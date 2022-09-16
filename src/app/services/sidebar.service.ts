import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Main',
          routerLink: '/',
        },
        {
          title: 'Progressbar',
          routerLink: '/dashboard/progress',
        },
        {
          title: 'Graphics',
          routerLink: '/dashboard/grafica1',
        },
        {
          title: 'Promises',
          routerLink: '/dashboard/promises',
        },
        {
          title: 'RXJS',
          routerLink: '/dashboard/rxjs',
        },
      ],
    },
  ];
}
