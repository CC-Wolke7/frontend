import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPreviewPageRoutingModule } from './search-preview-routing.module';
import { SearchPreviewPage } from './search-preview.page';
import { SharedModule } from '../shared/shared.module';
import {HomePageModule} from "../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPreviewPageRoutingModule,
        SharedModule,
        HomePageModule
    ],
  declarations: [SearchPreviewPage]
})
export class SearchPreviewPageModule {}
