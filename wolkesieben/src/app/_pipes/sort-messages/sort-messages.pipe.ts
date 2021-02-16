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
      const da = new Date(a.date);
      const db = new Date(b.date);
      if (+da > +db) {
        return asc ? 1 : -1;
      }
      return asc ? -1 : 1;
    });
  }

}
