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

  constructor(private navController: NavController,
              private likeService: LikeService,
              private favService: FavService,
              private userService: UserService) { }

  async ngOnInit() {
    this.offer = this.setFallback(this.offer); // fixme removeFallback
    if (this.user) {
      // this.isFav = await this.isFaved();
      this.offer.published_by = await this.getUser((this.offer.published_by) as any);
      this.offer.like = await this.likeService.getLike(this.offer);
    }
  }

  goToOffer(): void {
    if (this.user) {
      const navigationExtras: NavigationExtras = {state: this.offer};
      this.navController.navigateForward(`/offer/${this.offer.uuid}`, navigationExtras).then();
    }
  }

  async getUser(url: string): Promise<any> {
    try {
      return await this.userService.getByUrl(url);
    } catch (e) {
      return JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY));  // fixme remove fallback
    }
  }

  async isFaved(): Promise<boolean> {
    try {
      const db_user = await this.favService.getFavs();
      const favs = db_user.favorites;
      return new Promise(async () => {
        return favs.indexOf(this.offer.uuid) !== -1;
      });
    } catch (e) {
      return new Promise(async () => {
        return false;
      });
    }
  }

  async toggleLike(): Promise<void> {
    await this.likeService.toggleLike(this.offer).toPromise();
    this.offer.like = await this.likeService.getLike(this.offer);
  }

  async toggleFav(): Promise<void> {
    await this.favService.saveFav(this.offer);
  }

  /**
   * @description fallback function for offer: fill in required fields
   * @param offer: Offer
   * @return Offer
   */
  setFallback(offer: Offer): Offer {
    if (!offer.sex) {
      offer.sex = 'F';
    }
    if (!offer.place) {
      offer.place = 'Frankfurt am Main';
    }
    if (offer.media.length === 0) {
      offer.media.push('assets/images/placeholder.jpg');
    }
    return offer;
  }
}
