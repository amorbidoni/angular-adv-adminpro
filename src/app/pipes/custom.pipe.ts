import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(value: number, percentage: number): string {
    return (`${(value * percentage) / 100}%`);
  }

}
