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
              private navController: NavController) { }

  offer: Offer;
  chatActive: boolean;

  private getParam() {
    this.route.queryParams.subscribe(() => {
      this.offer = (this.router.getCurrentNavigation().extras.state as Offer);
    });
  }

  private checkAccess() {
    if (!this.offer) {
      this.navController.navigateRoot('/').then();
    }
  }

  ngOnInit() {
    this.getParam();
    this.checkAccess();

    console.log(this.offer);
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
