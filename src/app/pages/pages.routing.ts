import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path         : 'dashboard',
    component    : PagesComponent,
    canActivate  : [AuthGuard],
    canLoad      : [AuthGuard],
    loadChildren : ()=> import('./child-routes.module').then(m=> m.ChildRoutesModule)
  },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule {}
