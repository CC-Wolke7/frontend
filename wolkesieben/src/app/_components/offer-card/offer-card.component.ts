import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../_objects/offer';
import {NavController} from '@ionic/angular';
import {Like} from '../../_objects/like';
import {LikeService} from '../../_services/like.service';
import {User} from '../../_objects/user';

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

  constructor(private navController: NavController, private likeService: LikeService) { }

  ngOnInit() {}

  goToOffer(): void {
    if (this.user) {
      this.navController.navigateForward(`/offer/${this.offer.id}`).then();
    }
  }

  async toggleLike(): Promise<void> {
    console.log(this.user);
    await this.likeService.toggleLike(this.user, this.offer).toPromise();
    this.offer.like = await this.likeService.getLike(this.user, this.offer);
    console.log('offer after toggle like', this.offer);
  }
}
