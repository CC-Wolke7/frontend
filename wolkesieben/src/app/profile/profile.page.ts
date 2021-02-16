import {Component, OnInit} from '@angular/core';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';
import {AppService} from "../_services/app.service";
import {OfferService} from "../_services/offer.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  savedImgUrl: string;
  description: string;
  blob: Blob;
  reader: FileReader;
  user: User;

  type: string;
  breed: string;
  allSpecies: string[] = [];
  allBreeds: string[] = [];

  constructor(private appService: AppService, private userService: UserService, private offerService: OfferService) {
    this.description = 'init value!';
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.reader = new FileReader();
    await this.loadSpecies();
    await this.getImage();
  }

  async getImage() {
    this.savedImgUrl = await this.appService.getImage(this.user);
  }

  uploadImage(event){
    const file = event.target.files[0];
    this.reader.readAsArrayBuffer(file);
    this.reader.onload = () => {
      const blob = new Blob([new Uint8Array((this.reader.result as ArrayBuffer))]);
      this.savedImgUrl = URL.createObjectURL(blob);
      this.blob = blob;
    };
  }

  saveImage(){
    this.reader.readAsDataURL(this.blob);
    this.reader.onload = () => {
      console.log('reader on load');
      const base64data = this.reader.result;
      this.appService.uploadImage(this.user, base64data as string);
    };
  }

  changeDescription(){
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    this.appService.changeDescription(user, this.description);
  }

  subscribe(breed: string){
    const user = JSON.parse(localStorage.getItem(AppService.LOCAL_STORAGE_KEY)) as User;
    console.log(user.jwtToken);
    this.appService.subscribe(user, breed);
  }

  async loadSpecies() {
    this.allSpecies = await this.offerService.getSpecies();
  }

  async loadBreeds() {
    this.allBreeds = await this.offerService.getBreeds(this.type);
  }

}
