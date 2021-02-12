import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../_objects/offer';
import {NavController} from '@ionic/angular';
import {Like} from '../../_objects/like';
import {LikeService} from '../../_services/like.service';
import {User} from '../../_objects/user';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() user: User;
  @Input() likes: Like[] = [];

  @Output() likesUpdated: EventEmitter<Like[]> = new EventEmitter<Like[]>();

  constructor(private navController: NavController,
              private likeService: LikeService) { }

  ngOnInit() {}

  goToOffer(): void {
    if (this.user) {
      const navigationExtras: NavigationExtras = {state: this.offer};
      this.navController.navigateForward(`/offer/${this.offer.uuid}`, navigationExtras).then();
    }
  }

  async toggleLike(): Promise<void> {
    await this.likeService.toggleLike(this.offer).toPromise();
    this.offer.like = await this.likeService.getLike(this.offer);
  }

    async toggleFav(): Promise<void> {

    }
}
