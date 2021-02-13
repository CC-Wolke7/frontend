import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OfferCardComponent } from '../_components/offer-card/offer-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        SharedModule
    ],
    exports: [
        OfferCardComponent
    ],
    declarations: [HomePage, OfferCardComponent]
})
export class HomePageModule {}
