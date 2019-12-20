import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetails implements OnInit {

  items: Array<any>;
  forecast: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    console.log("-- getData --");
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
     })
  }

  randomTime(dateInitial) {
    console.log("randomTime = "+dateInitial);
    let arrayDate = dateInitial.split("/");
    let start = new Date(arrayDate[2],arrayDate[1],arrayDate[0]);
    let end = new Date(start.getFullYear()+100,start.getMonth(),start.getDate());
    let diff =  end.getTime() - start.getTime();
    let new_diff = diff * Math.random();
    let date = new Date(start.getTime() + new_diff);
    let dateFinal = date.toLocaleString().split(" ")[0];
    return dateFinal;
  }

}
