import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {OfferCardComponent} from '../_components/offer-card/offer-card.component';
import {AuthButtonComponent} from '../_components/auth-button/auth-button.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule
    ],
  declarations: [HomePage, OfferCardComponent, AuthButtonComponent]
})
export class HomePageModule {}
