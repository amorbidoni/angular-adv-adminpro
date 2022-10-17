import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private settingService: SettingService,
              private sideBarService: SidebarService) {}

  ngOnInit() {
    this.sideBarService.getMenu();
    customInitFunction();
  }
  year: number = new Date().getFullYear();
}
