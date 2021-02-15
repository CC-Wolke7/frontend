import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import {SharedModule} from '../shared/shared.module';
import {EditOfferComponent} from '../_components/edit-offer/edit-offer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewOfferPageRoutingModule,
        SharedModule
    ],
    exports: [EditOfferComponent],
  declarations: [NewOfferPage, EditOfferComponent]
})
export class NewOfferPageModule {}
