import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthButtonComponent} from './_components/auth-button/auth-button.component';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({animated: false}), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthButtonComponent,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
