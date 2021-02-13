import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferService} from '../_services/offer.service';
import {Offer} from '../_objects/offer';
import {NavController} from '@ionic/angular';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navController: NavController,
              private offerService: OfferService,
              private userService: UserService) { }

  offer: Offer;
  chatActive: boolean;

  private getParam() {
    this.route.queryParams.subscribe(() => {
      if (this.router && this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras) {
        this.offer = (this.router.getCurrentNavigation().extras.state as Offer);
      }
    });
  }

  async checkAccess() {
    if (!this.offer) {
      const uuid = this.route.snapshot.paramMap.get('uuid');
      try {
        this.offer = await this.offerService.getOffer(uuid);
        this.offer.media = await this.offerService.getImages(uuid);
        if (this.offer.media.length === 0) {
          this.offer.media.push('assets/images/placeholder.jpg');
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async ngOnInit() {
    await this.userService.getUser();
    this.getParam();
    await this.checkAccess();
  }
}
