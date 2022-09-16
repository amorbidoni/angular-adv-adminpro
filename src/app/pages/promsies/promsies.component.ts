import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promsies',
  templateUrl: './promsies.component.html',
  styles: [],
})
export class PromsiesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('hola mundo');
    //   } else {
    //     reject('algo salio mal');
    //   }
    // });
    // promise
    //   .then((msj) => {
    //     console.log(msj);
    //   })
    //   .catch((msj) => {
    //     console.log(`error en la promsesa ${msj}`);
    //   });
    // console.log('fin del init');
    this.getUsuarios().then((usuarios) => console.log(usuarios));
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((res) => res.json())
        .then((body) => resolve(body.data));
    });
  }
  // getUsuarios() {
  //   fetch('https://reqres.in/api/users?page=2').then((res: any) => {
  //     res.json().then((body: any) => console.log(body.data));
  //   });
  // }
}
