import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OfferPageRoutingModule} from './offer-routing.module';
import {OfferPage} from './offer.page';
import {SexPipe} from '../_pipes/sex/sex.pipe';
import {OfferImagesCollectionComponent} from '../_components/offer-images-collection/offer-images-collection.component';
import {OfferChatComponent} from '../_components/offer-chat/offer-chat.component';
import {OfferDetailInfoComponent} from '../_components/offer-detail-info/offer-detail-info.component';
import {ChatMessageComponent} from '../_components/chat-message/chat-message.component';
import {GermanDatePipe} from '../_pipes/german-date/german-date.pipe';
import {SharedModule} from '../shared/shared.module';
import {PipesModule} from '../_pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        OfferPageRoutingModule,
        PipesModule
    ],
    declarations: [
        OfferPage,
        OfferImagesCollectionComponent,
        OfferChatComponent,
        OfferDetailInfoComponent,
        ChatMessageComponent
    ]
})
export class OfferPageModule {
}
