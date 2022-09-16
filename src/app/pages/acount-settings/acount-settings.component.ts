import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [],
})
export class AcountSettingsComponent implements OnInit {
  public linkTheme = document.getElementById('theme');
  public links!: NodeListOf<Element>;
  constructor() {}

  ngOnInit() {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }
  changeColor(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    this.links.forEach((e) => {
      e.classList.remove('working');
      const btnTheme = e.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        e.classList.add('working');
      }
    });
  }
}
