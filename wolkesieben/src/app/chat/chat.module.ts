import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import {PipesModule} from '../_pipes/pipes.module';
import {SharedModule} from '../shared/shared.module';
import {OfferPageModule} from '../offer/offer.module';
import {AngularSplitModule} from 'angular-split';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    PipesModule,
    SharedModule,
    OfferPageModule,
    AngularSplitModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
