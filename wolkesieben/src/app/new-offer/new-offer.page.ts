import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from "../_objects/user";
import {Offer} from "../_objects/offer";
import {OfferService} from "../_services/offer.service";
import {AppService} from "../_services/app.service";

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  user: User;

  offer: Offer;
  allSpecies: any[];
  allBreeds: any[];

  blob: Blob;
  reader: FileReader;
  imgUrl: string;

  base64Data: string | ArrayBuffer;

  constructor(private userService: UserService,
              private offerService: OfferService) { }

  private async sendOffer() {
    this.offer.published_by = OfferService.getUrl(`/users/${this.user.uuid}/`);
    this.offer = await this.offerService.uploadOffer(this.offer);
  }

  private async sendImage() {
    const imageData = {
      name: `${this.offer.name}`, // TODO create unique file name
      image: this.base64Data
    };
    await this.offerService.uploadImage(this.offer.uuid, imageData);
  }

  async ngOnInit() {
    this.offer = new Offer();
    this.user = await this.userService.getUser();
  }

  uploadImage(event) {
    this.reader = new FileReader();
    this.reader.onloadend = () => {
      const blob = new Blob([new Uint8Array((this.reader.result as ArrayBuffer))]);
      this.imgUrl = URL.createObjectURL(blob);
      this.blob = blob;
      this.getBase64().then();
    };

    const file = event.target.files[0];
    this.reader.readAsArrayBuffer(file);
  }

  async getBase64(): Promise<any> {
    this.reader.readAsDataURL(this.blob);
    this.reader.onloadend = () => {
      this.base64Data = this.reader.result;
    };
}

  async submitOffer() {
    await this.sendOffer();
    await this.sendImage();
  }
}
