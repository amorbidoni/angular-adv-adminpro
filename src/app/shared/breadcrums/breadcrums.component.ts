import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [],
})
export class BreadcrumsComponent implements OnDestroy {
  public title: string = 'Sin título';
  public titleSubs!: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleSubs = this.getRouterData().subscribe(({ title }) => {
      this.title = title;
    });
    // otra forma de acceder a la data de la ruta es con ActivatedRoute y subscribirme a los cambios en los hijos
    // console.log(activatedRoute.snapshot.children[0].data.title);
  }
  ngOnDestroy() {
    this.titleSubs.unsubscribe();
  }

  getRouterData() {
    return this.router.events.pipe(
      filter((x: any) => x instanceof ActivationEnd),
      filter((x: ActivationEnd) => x.snapshot.firstChild === null),
      map((x: ActivationEnd) => x.snapshot.data)
    );
  }
}
