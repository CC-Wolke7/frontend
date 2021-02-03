import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchRequestPageRoutingModule } from './search-request-routing.module';
import { SearchRequestPage } from './search-request.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRequestPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchRequestPage]
})
export class SearchRequestPageModule {}
