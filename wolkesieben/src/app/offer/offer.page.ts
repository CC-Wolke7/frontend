import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferService} from '../_services/offer.service';
import {Offer} from '../_objects/offer';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navController: NavController,
              private offerService: OfferService) { }

  offer: Offer;
  chatActive: boolean;

  private getParam() {
    this.route.queryParams.subscribe(() => {
      this.offer = (this.router.getCurrentNavigation().extras.state as Offer);
    });
  }

  async checkAccess() {
    if (!this.offer) {
      const uuid = this.route.snapshot.paramMap.get('uuid');
      try {
        this.offer = await this.offerService.getOffer(uuid);
        this.offer.sex = 'F'; // fixme remove fallback
        if (this.offer.media.length === 0) { // fixme remove fallback
          this.offer.media.push('assets/images/placeholder.jpg');
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  ngOnInit() {
    this.getParam();
    this.checkAccess().then();
  }

  openChat() {
    this.chatActive = !this.chatActive;
  }
  sendMessage() {
    console.log('Implement me ..');
  }


  closeChat() {
    this.chatActive = !this.chatActive;
  }
}
