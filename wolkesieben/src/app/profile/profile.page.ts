import {Component, OnInit} from '@angular/core';
import {User} from '../_objects/user';
import {AppService} from '../_services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  imgUrl: string;
  savedImgUrl: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  uploadImage(event){
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      const blobURL: string = URL.createObjectURL(blob);
      this.imgUrl = blobURL;
    };

    reader.onerror = (error) => {
      console.log(error);
    };
  }

  saveImage(){
    this.savedImgUrl = this.imgUrl;
    // TODO load to storage
  }

}
