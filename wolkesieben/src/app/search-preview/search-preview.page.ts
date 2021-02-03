import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Offer} from '../_objects/offer';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.page.html',
  styleUrls: ['./search-preview.page.scss'],
})
export class SearchPreviewPage implements OnInit {

  offers: Offer[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navController: NavController) { }


  private getParam() {
    this.route.queryParams.subscribe(() => {
      this.offers = (this.router.getCurrentNavigation().extras.state as Offer[]);
    });
  }

  ngOnInit() {
    this.getParam();
    if (!this.offers) {
      this.navController.navigateRoot('/').then();
    }
    console.log(this.offers);
  }

}
