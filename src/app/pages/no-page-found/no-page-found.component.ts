import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css'],
})
export class NoPageFoundComponent {
  year: number = new Date().getFullYear();
}
