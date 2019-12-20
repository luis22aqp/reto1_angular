import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  averageAge: number = 0;
  standardDeviation: number = 0; 

  items: Array<any>;

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

      this.getAverageAge();
      this.getStandardDeviation();
    })
  }

  getAverageAge(){
    console.log("-- getAverageAge --");
    let average = 0
    let sum = 0;
    let count = 0;
    this.items.forEach(element => {
      sum = sum + element.payload.doc.data().edad;
      count++;
    });
    average = sum / count;
    this.averageAge = average;
  }

  getStandardDeviation(){
    console.log("-- getStandardDeviation --");
    let dif = 0;
    let square = 0;
    let sumSquare = 0;
    let count = 0;
    let variance = 0;
    this.items.forEach(element => {
      dif = element.payload.doc.data().edad - this.averageAge;
      square = dif * dif;
      sumSquare = sumSquare + square;
      count++;
    });
    variance = sumSquare / count;
    this.standardDeviation = Math.sqrt(variance);
  }

  
  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }
  
}
