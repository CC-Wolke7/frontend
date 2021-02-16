import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toLowerCase() === 'male') {
      return 'männlich';
    } else if (value.toLowerCase() === 'female') {
      return 'weiblich';
    }
  }

}
