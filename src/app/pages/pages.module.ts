import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//
import { SharedModule } from '../shared/shared.module';

//
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromsiesComponent } from './promsies/promsies.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    AcountSettingsComponent,
    PromsiesComponent,
    RxjsComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
