import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  solvente: boolean = false;
  prestamos: boolean = false;

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      nombre: [this.item.nombre],
      apellido: [this.item.apellido],
      edad: [this.item.edad],
      fechaNacimiento: [this.item.fechaNacimiento]
    });
    if(this.item.edad >= 35){
      this.solvente = true;
    }else{
      this.solvente = false;
    }
    if(this.item.edad >= 40){
      this.prestamos = true;
    }else{
      this.prestamos = false;
    }
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
