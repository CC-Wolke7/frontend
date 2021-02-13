import {Component, OnInit} from '@angular/core';
import {User} from '../_objects/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  imgUrl: string;
  savedImgUrl: string;
  description: string;
  blob: Blob;
  reader: FileReader;

  user: User;

  constructor(private userService: UserService) {
    this.description = 'init value!';
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.reader = new FileReader();
  }

  uploadImage(event){
    const file = event.target.files[0];

    this.reader.readAsArrayBuffer(file);
    this.reader.onloadend = () => {
      const blob = new Blob([new Uint8Array((this.reader.result as ArrayBuffer))]);
      this.imgUrl = URL.createObjectURL(blob);
      this.blob = blob;
    };
  }

  saveImage(){
    this.savedImgUrl = this.imgUrl;
    this.reader.readAsDataURL(this.blob);
    this.reader.onloadend = () => {
      const base64data = this.reader.result;
      console.log(base64data);
      // TODO send to appservice
      return;
    };
  }

  changeDescription(){
    this.description = 'changed';
  }

}
