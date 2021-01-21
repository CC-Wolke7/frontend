import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../_objects/offer';
import {NavController} from '@ionic/angular';
import {Like} from '../../_objects/like';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() user: gapi.auth2.GoogleUser;
  @Input() likes: Like[] = [];

  @Output() likesUpdated: EventEmitter<Like[]> = new EventEmitter<Like[]>();

  constructor(private navController: NavController) { }

  ngOnInit() {}

  goToOffer(): void {
    if (this.user) {
      this.navController.navigateForward(`/offer/${this.offer.id}`).then();
    }
  }

  liked() {
    return this.likes.includes(this.user.getId());
  }

  toggleLike() {
    if (this.liked()) {
      const index = this.likes.indexOf(this.user.getId());
      this.likes.splice(index, 1);
    } else {
      this.likes.push(this.user.getId());
    }
    this.sendLikes();
  }

  sendLikes() {
    // todo send likes to likeService

    // on success: send likes to parent page
    this.likesUpdated.next(this.likes);
  }
}
