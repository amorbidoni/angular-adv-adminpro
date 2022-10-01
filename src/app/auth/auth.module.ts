import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
