import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offer-images-collection',
  templateUrl: './offer-images-collection.component.html',
  styleUrls: ['./offer-images-collection.component.scss'],
})
export class OfferImagesCollectionComponent implements OnInit {

  @Input() images: string[];

  constructor() { }

  ngOnInit() {}

}
