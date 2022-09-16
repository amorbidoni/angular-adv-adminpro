import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private linkTheme = document.getElementById('theme');
  constructor() {
    let selectedThemeUrl =
      localStorage.getItem('theme') || './assets/css/colors/megna-dark.css';
    this.linkTheme?.setAttribute('href', selectedThemeUrl);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

  checkCurrentTheme(): void {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((e) => {
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
