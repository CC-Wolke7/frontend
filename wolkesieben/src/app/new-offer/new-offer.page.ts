import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from "../_objects/user";
import {Offer} from "../_objects/offer";
import {OfferService} from "../_services/offer.service";
import {AppService} from "../_services/app.service";
import {AlertController, NavController} from "@ionic/angular";

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
              private offerService: OfferService,
              private alertController: AlertController,
              private navController: NavController) { }

  private async sendOffer() {
    this.offer.published_by = this.user.uuid;
    this.offer = await this.offerService.uploadOffer(this.offer);
  }

  private async sendImage() {
    if (this.blob instanceof Blob) {
      this.reader.readAsDataURL(this.blob);
      this.reader.onload = async () => {
        const base64data = this.reader.result;
        await this.offerService.uploadImage(this.offer.uuid, base64data as string);
        await this.presentSuccessAlert();
      };
    } else {
      await this.presentSuccessAlert();
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Anzeige wurde erfolgreich erstellt.',
      message: 'Du wirst jetzt zur Startseite weitergeleitet.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.navController.navigateRoot('/').then();
        }
      }]
    });
    await alert.present();
  }

  async ngOnInit() {
    this.offer = new Offer();
    this.user = await this.userService.getUser();
    this.reader = new FileReader();
  }

  uploadImage(event) {
    const file = event.target.files[0];
    this.reader.readAsArrayBuffer(file);

    this.reader.onload = () => {
      const blob = new Blob([new Uint8Array((this.reader.result as ArrayBuffer))]);
      this.imgUrl = URL.createObjectURL(blob);
      this.blob = blob;
      this.getBase64().then();
    };

  }

  async getBase64(): Promise<any> {
    this.reader.readAsDataURL(this.blob);
    this.reader.onload = () => {
      this.base64Data = this.reader.result;
    };
}

  async submitOffer() {
    await this.sendOffer();
    await this.sendImage();
  }
}
