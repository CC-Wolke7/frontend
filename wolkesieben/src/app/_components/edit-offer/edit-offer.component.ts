import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../_objects/offer';
import {OfferService} from "../../_services/offer.service";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {

  @Input() offer: Offer;

  allBreeds: any[];
  allSpecies: any[];

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.loadSpecies().then();
  }

  async loadBreeds() {
    this.allBreeds = await this.offerService.getBreeds(this.offer.species);
  }

  async loadSpecies() {
    this.allSpecies = await this.offerService.getSpecies();
  }

}
