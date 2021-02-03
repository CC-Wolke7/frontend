import { Component, OnInit } from '@angular/core';
import {NavigationExtras} from "@angular/router";
import {NavController} from "@ionic/angular";
import {Search} from "../_objects/search";
import {AppService} from "../_services/app.service";
import {Offer} from "../_objects/offer";

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.page.html',
  styleUrls: ['./search-request.page.scss'],
})
export class SearchRequestPage implements OnInit {

  search: Search;
  offers: Offer[];

  constructor(private navController: NavController, private appService: AppService) {}

  ngOnInit() {
  }

  async do_search(){
    // filter
    this.offers = await this.appService.getOffers().toPromise();
    this.offers.filter((o: Offer) => {
      return (
        o.type === this.search.type &&
        (!this.search.breed ||
            o.breed === this.search.breed) &&
            o.age === this.search.age
      );
    });

    const navigationExtras: NavigationExtras = {state: this.offers};
    this.navController.navigateForward(`/search-preview`, navigationExtras).then();
  }

}
