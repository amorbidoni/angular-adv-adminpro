import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input('valor') progress: number = 20;
  @Input() btnClass: string = 'btn-primary';
  @Output()
  newValue: EventEmitter<number> = new EventEmitter();
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number): any {
    this.progress = Number(this.progress);
    if (this.progress >= 100 && valor >= 0) {
      this.progress = 100;
      this.newValue.emit(this.progress);
      return;
    } else if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
      this.newValue.emit(this.progress);
      return;
    }
    this.progress = this.progress + valor;
    this.newValue.emit(this.progress);
  }

  emitNewValue() {}
  isInvalid: boolean = false;
  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.newValue.emit(this.progress);
  }
}
