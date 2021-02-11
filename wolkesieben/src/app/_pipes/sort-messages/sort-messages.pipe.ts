import { Pipe, PipeTransform } from '@angular/core';
import {Message} from '../../_objects/message';

@Pipe({
  name: 'sortMessages'
})
export class SortMessagesPipe implements PipeTransform {

  transform(values: Message[], asc: boolean = true): unknown {
    if (!values) {
      return values;
    }
    return values.sort((a: Message, b: Message) => {
      if (+a.date > +b.date) {
        return asc ? -1 : 1;
      }
      return asc ? 1 : -1;
    });
  }

}
