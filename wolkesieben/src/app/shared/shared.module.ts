import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../_components/header/header.component';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {AuthButtonComponent} from "../_components/auth-button/auth-button.component";


@NgModule({
  declarations: [HeaderComponent, AuthButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [HeaderComponent, AuthButtonComponent]
})
export class SharedModule { }
