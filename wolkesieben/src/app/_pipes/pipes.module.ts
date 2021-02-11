import { NgModule } from '@angular/core';
import {SortMessagesPipe} from './sort-messages/sort-messages.pipe';
import {GermanDatePipe} from './german-date/german-date.pipe';
import {SexPipe} from './sex/sex.pipe';

@NgModule({
    declarations: [SortMessagesPipe, GermanDatePipe, SexPipe],
    imports: [],
    exports: [SortMessagesPipe, GermanDatePipe, SexPipe],
})

export class PipesModule {}
