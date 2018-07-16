// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
