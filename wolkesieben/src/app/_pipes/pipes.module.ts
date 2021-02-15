import { NgModule } from '@angular/core';
import {SortMessagesPipe} from './sort-messages/sort-messages.pipe';
import {GermanDatePipe} from './german-date/german-date.pipe';
import {SexPipe} from './sex/sex.pipe';
import { UserNamePipe } from './user-name/user-name.pipe';

@NgModule({
    declarations: [SortMessagesPipe, GermanDatePipe, SexPipe, UserNamePipe],
    imports: [],
    exports: [SortMessagesPipe, GermanDatePipe, SexPipe, UserNamePipe],
})

export class PipesModule {}
