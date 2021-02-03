import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Search} from '../_objects/search';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.page.html',
  styleUrls: ['./search-preview.page.scss'],
})
export class SearchPreviewPage implements OnInit {

  search: Search;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navController: NavController) { }


  private getParam() {
    this.route.queryParams.subscribe(() => {
      this.search = (this.router.getCurrentNavigation().extras.state as Search);
    });
  }

  ngOnInit() {
    this.getParam();
    if (!this.search) {
      this.navController.navigateRoot('/').then();
    }
    console.log(this.search);
  }

}
