import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [],
})
export class AcountSettingsComponent implements OnInit {
  constructor(private settingService: SettingService) {}

  ngOnInit() {
    this.settingService.checkCurrentTheme();
  }
  changeColor(theme: string) {
    this.settingService.changeTheme(theme);
    this.settingService.checkCurrentTheme();
  }
}
