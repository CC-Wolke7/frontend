import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OfferPageRoutingModule } from './offer-routing.module';
import { OfferPage } from './offer.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferPageRoutingModule,
      SharedModule
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
