import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { parse } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUser(userKey){
    return this.db.collection('clientes').doc(userKey).snapshotChanges();
  }

  getUsers(){
    return this.db.collection('clientes').snapshotChanges();
  }

  createUser(value){
    return this.db.collection('clientes').add({
      nombre: value.nombre,
      apellido: value.apellido,
      edad: parseInt(value.edad),
      fechaNacimiento: value.fechaNac.toLocaleString().split(" ")[0]
    });
  }
}
