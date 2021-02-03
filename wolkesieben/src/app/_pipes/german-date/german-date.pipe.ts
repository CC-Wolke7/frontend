import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanDate'
})
export class GermanDatePipe implements PipeTransform {

  transform(value: Date): string {
    const y = `${value.getFullYear()}`;
    const m = `0${value.getMonth() + 1}`.slice(-2);
    const d = `0${value.getDate()}`.slice(-2);

    const h = `0${value.getHours()}`.slice(-2);
    const i = `0${value.getMinutes()}`.slice(-2);
    const s = `0${value.getSeconds()}`.slice(-2);

    return `${d}.${m}.${y} ${h}:${i}:${s}`;
  }

}
