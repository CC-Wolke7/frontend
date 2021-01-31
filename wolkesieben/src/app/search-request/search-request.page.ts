import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.page.html',
  styleUrls: ['./search-request.page.scss'],
})
export class SearchRequestPage implements OnInit {
  breed;
  type;
  age;
  search(){
    console.log(this.breed);
    console.log(this.type);
    console.log(this.age);
  }
  constructor() { }

  ngOnInit() {
  }

}
