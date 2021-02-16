import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Offer} from '../_objects/offer';
import {UserService} from "../_services/user.service";
import {User} from "../_objects/user";

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.page.html',
  styleUrls: ['./search-preview.page.scss'],
})
export class SearchPreviewPage implements OnInit {

  offers: Offer[];
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navController: NavController,
              private userService: UserService) {
    this.route.queryParams.subscribe(() => {
      this.offers = (this.router.getCurrentNavigation().extras.state as Offer[]);
      console.log(this.offers);
    });
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    if (!this.offers) {
      this.navController.navigateRoot('/search-request').then();
    }
  }

}
