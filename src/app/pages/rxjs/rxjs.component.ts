import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';

import { from, interval, Observable, Subscription, of } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';
import { UsersService, User } from '../../services/users.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: [`./table.scss`],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public  users      : User[] = [];
  private interval !: number;
  constructor(private usersService : UsersService) {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (res) => console.log(res),
    //     (err) => console.warn(err),
    //     () => console.info('Obs terminado')
    //   );
   
    // this.instervalSubs = this.retornaIntervalo().subscribe(console.log);
  } 
  ngOnDestroy() {
    this.instervalSubs.unsubscribe();
   
  }
  public instervalSubs!: Subscription;

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((valor) => valor % 2 === 0)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('I llego a valor de 2');
        }
      }, 1000);
    });
    return obs$;
  }
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(res=>{
      console.log('user service: ', res)
    })
    this.usersService.getInterval().pipe( 
      map( n => n + 1 ),
      take(10), 
      filter( n => n % 2 === 0 ), 
    ) .subscribe(res=>{
      this.interval = res;
      console.log(res);
    })
  }

  params = {
    talles: [70, 80, 90],
    colors: ['Rojo', 'Rosa', 'Negro', 'Azul', 'Violeta'],
  };
 
}
