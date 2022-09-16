import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}
  public linkTheme = document.getElementById('theme');
  ngOnInit() {
    let selectedThemeUrl =
      localStorage.getItem('theme') || './assets/css/colors/megna-dark.css';
    this.linkTheme?.setAttribute('href', selectedThemeUrl);
  }
  year: number = new Date().getFullYear();
}
