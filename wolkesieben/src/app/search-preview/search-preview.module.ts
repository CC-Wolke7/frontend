import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPreviewPageRoutingModule } from './search-preview-routing.module';
import { SearchPreviewPage } from './search-preview.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPreviewPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchPreviewPage]
})
export class SearchPreviewPageModule {}
