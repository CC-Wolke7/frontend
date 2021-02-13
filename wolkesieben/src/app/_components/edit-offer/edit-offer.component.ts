import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../_objects/offer';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {

  @Input() offer: Offer;
  constructor() { }

  ngOnInit() {}

}
