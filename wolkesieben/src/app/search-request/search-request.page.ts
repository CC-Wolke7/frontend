import { Component, OnInit } from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Search} from '../_objects/search';
import {AppService} from '../_services/app.service';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.page.html',
  styleUrls: ['./search-request.page.scss'],
})
export class SearchRequestPage implements OnInit {

  search: Search;
  offers: Offer[];
  loading = true;
  allBreeds: string[] = [];
  allSpecies: string[] = [];

  constructor(private navController: NavController,
              private appService: AppService,
              private offerService: OfferService,
              private userService: UserService) {}

  async ngOnInit() {
    await this.userService.getUser();
    this.search = new Search();
    this.loading = false;
    await this.loadSpecies();
  }

  async do_search(){
    // filter
    this.offers = await this.offerService.getOffers().toPromise();
    this.offers = this.offers.filter((o: Offer) => {
      return (
        o.species === this.search.type &&
        (!this.search.breed || o.breed === this.search.breed &&
            !this.search.age || o.age === this.search.age)
      );
    });


    const navigationExtras: NavigationExtras = {state: this.offers};
    this.navController.navigateForward(`/search-preview`, navigationExtras).then();
  }

  async loadBreeds() {
    this.allBreeds = await this.offerService.getBreeds(this.search.type);
  }

  async loadSpecies() {
    this.allSpecies = await this.offerService.getSpecies();
  }
}
