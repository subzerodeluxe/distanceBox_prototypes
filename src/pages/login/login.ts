import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

// import pages and services 
//import { TabsPage } from '../tabs/tabs';
import { AuthService } from "../../providers/auth-service";
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, 
   public auth: AuthService, public loadCtrl: LoadingController,
   public alertCtrl: AlertController) {   
  }
 
  loginWithFacebook() {

    const loadMessage = this.loadCtrl.create({
      content: "Signing you in ..." 
    });
    loadMessage.present(); 

    this.auth.loginWithFacebook().subscribe((success) => {
      loadMessage.dismiss(); // hide signing you in message 
      console.log(success); 
      this.navCtrl.setRoot(ProfilePage);  
    }, err => {
      loadMessage.dismiss();
      this.showAlert("Could not sign you in. Try again!"); 
    });
  } // loginWithFacebook

  showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Bad connection?',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present(); 
  }
}
