import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../_objects/offer';
import {NavController} from '@ionic/angular';
import {Like} from '../../_objects/like';
import {LikeService} from '../../_services/like.service';
import {User} from '../../_objects/user';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';
import {NavigationExtras} from '@angular/router';
import {FavService} from "../../_services/fav.service";
import {UserService} from "../../_services/user.service";
import {AppService} from "../../_services/app.service";
import {OfferService} from "../../_services/offer.service";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() user: User;
  @Input() likes: Like[] = [];
  isFav = false;

  @Output() likesUpdated: EventEmitter<Like[]> = new EventEmitter<Like[]>();
  @Output() unFav: EventEmitter<void> = new EventEmitter<void>();

  constructor(private navController: NavController,
              private likeService: LikeService,
              private favService: FavService,
              private userService: UserService,
              private offerService: OfferService) { }

  async ngOnInit() {
    await this.getImages();
    if (this.user) {
      await this.isFaved();
      this.offer.like = await this.likeService.getLike(this.offer);
    }
  }

  goToOffer(): void {
    if (this.user) {
      const navigationExtras: NavigationExtras = {state: this.offer};
      this.navController.navigateForward(`/offer/${this.offer.uuid}`, navigationExtras).then();
    }
  }

  /* async getUser(url: string): Promise<any> {
    try {
      return await this.userService.getByUrl(url);
    } catch (e) {
      return JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));  // fixme remove fallback
    }
  }*/

  async isFaved() {
    const favs = await this.favService.getFavs();
    this.isFav = favs.indexOf(this.offer.uuid) !== -1;
  }

  async toggleLike(): Promise<void> {
    await this.likeService.toggleLike(this.offer).toPromise();
    this.offer.like = await this.likeService.getLike(this.offer);

  }

  async toggleFav(): Promise<void> {
    if (!this.isFav) {
      await this.favService.saveFav(this.offer);
    } else {
      await this.favService.removeFav(this.offer);
      this.unFav.next();
    }
    await this.isFaved();
  }

  async getImages() {
    this.offer.media = await this.offerService.getImages(this.offer.uuid);
    if (!this.offer.media || this.offer.media.length === 0) {
      this.offer.media = ['assets/images/placeholder.jpg'];
    }
  }
}
