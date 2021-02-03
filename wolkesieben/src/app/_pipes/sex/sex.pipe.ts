import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toLowerCase() === 'm') {
      return 'männlich';
    } else if (value.toLowerCase() === 'f') {
      return 'weiblich';
    }
  }

}
