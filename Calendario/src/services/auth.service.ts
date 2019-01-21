import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http'
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';

import { longStackSupport } from 'q';



@Injectable()

export class AuthService{

    constructor(
        public afAuth: AngularFireAuth
    ){}

    getAuth(){
       return this.afAuth.authState.map(auth => auth); 
    }

    loginGoogle(){
        return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
    }

    logOut(){
        return this.afAuth.auth.signOut();
        
    }
}

