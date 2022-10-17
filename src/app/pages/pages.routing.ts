import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromsiesComponent } from './promsies/promsies.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'Gráfica' },
      },
      {
        path: 'acount-settings',
        data: { title: 'Ajustes' },
        component: AcountSettingsComponent,
      },
      {
        path: 'promises',
        component: PromsiesComponent,
        data: { title: 'Promesas' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'RxJs' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'Perfil' },
      },
      // Mantenimientos
      {
        path: 'usuarios',
        canActivate:[AdminGuard],
        component: UsuariosComponent,
        data: { title: 'Mantenimiento de Usuarios' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Mantenimiento de Hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Mantenimiento de Medicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { title: 'Mantenimiento de Medicos' },
      },
      {
        path: 'busquedas/:termino',
        component: BusquedaComponent,
        data: { title: 'Resultado de la búsqueda' },
      },
    ],
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
