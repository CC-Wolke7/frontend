import {Component, OnInit} from '@angular/core';
import {Offer} from '../_objects/offer';
import {OfferService} from '../_services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  offers: Offer[] = [];

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService.getRandomOffers().subscribe((offers: Offer[]) => {
      this.offers = offers.map(o => new Offer(o));
    });
  }



}
