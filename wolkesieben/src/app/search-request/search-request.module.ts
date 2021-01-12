import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchRequestPageRoutingModule } from './search-request-routing.module';

import { SearchRequestPage } from './search-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRequestPageRoutingModule
  ],
  declarations: [SearchRequestPage]
})
export class SearchRequestPageModule {}
