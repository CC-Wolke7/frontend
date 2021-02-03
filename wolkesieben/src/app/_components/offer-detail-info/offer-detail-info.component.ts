import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../_objects/offer';

@Component({
  selector: 'app-offer-detail-info',
  templateUrl: './offer-detail-info.component.html',
  styleUrls: ['./offer-detail-info.component.scss'],
})
export class OfferDetailInfoComponent implements OnInit {

  @Input() offer: Offer;

  constructor() { }

  ngOnInit() {

  }

}
