import { Component, OnInit } from '@angular/core';
import {NavigationExtras} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.page.html',
  styleUrls: ['./search-request.page.scss'],
})
export class SearchRequestPage implements OnInit {
  breed;
  type;
  age;

  constructor(private navController: NavController) {}

  ngOnInit() {
  }

  search(){
    console.log(this.breed);
    console.log(this.type);
    console.log(this.age);
    const navigationExtras: NavigationExtras = {state: [this.breed, this.type, this.age]};
    this.navController.navigateForward(`/search-preview`, navigationExtras).then();
  }

}
