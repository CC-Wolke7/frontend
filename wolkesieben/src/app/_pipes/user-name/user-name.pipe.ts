import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../_objects/user';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(user: string | User): string {
    if (user instanceof User) {
      return user.name;
    }
    return user;
  }

}
