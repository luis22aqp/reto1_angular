import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
   'nombre': [
     { type: 'required', message: 'Nombre es requerido.' }
   ],
   'apellido': [
     { type: 'required', message: 'Apellidos es requerido.' }
   ],
   'edad': [
     { type: 'required', message: 'Edad es requerido.' },
   ],
   'fechaNac': [
    { type: 'required', message: 'Fecha de Nacimiento es requerido.' },
  ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      nombre: ['', Validators.required ],
      apellido: ['', Validators.required ],
      edad: ['', Validators.required ],
      fechaNac: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      fechaNac: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
