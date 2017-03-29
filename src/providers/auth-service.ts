import { Injectable, EventEmitter, Inject} from '@angular/core';
import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp } from 'angularfire2'; //Add FirebaseApp
import { Observable } from "rxjs/Observable";
import { Platform, AlertController } from 'ionic-angular';
import { Facebook } from 'ionic-native';

import { auth } from 'firebase'; //needed for the FacebookAuthProvider
 
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;
   
   constructor(private alertCtrl: AlertController, private af: AngularFire, @Inject(FirebaseApp)firebase: any,
   private platform: Platform) { //Add reference to native firebase SDK
    this.firebase = firebase; 
    
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile'])
          .then(res => {
            const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            this.firebase.auth().signInWithCredential(facebookCredential).then(()=>{
            observer.next();
          })
          .catch(error => {
            observer.error(error);
          });
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
          }).then(()=>{
            observer.next();
          }).catch(error => {
            //console.log(error);
            observer.error(error);
        });
      }
    });
  } // loginWithFacebook
   
 
  logout() {
    this.af.auth.logout();
  }
 
  get userName():string {
    return this.authState?this.authState.auth.displayName:'';
  } 

  get userImage():string {
    return this.authState?this.authState.auth.photoURL:'';
  } 

}