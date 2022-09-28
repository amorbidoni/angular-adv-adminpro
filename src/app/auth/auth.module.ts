import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class AuthModule {}
