import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BreadcrumsComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [BreadcrumsComponent, HeaderComponent, SidebarComponent],
})
export class SharedModule {}
