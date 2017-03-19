import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// import pages and services 
import { AuthProvider } from '../../providers/auth-provider';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, 
   public auth: AuthProvider, public loadCtrl: LoadingController,
   public alertCtrl: AlertController) {   
  }
 
  loginWithFacebook() {

    const loadMessage = this.loadCtrl.create({
      content: "Signing you in ..." 
    });
    loadMessage.present(); 

    this.auth.loginWithFacebook().subscribe((success) => {
      loadMessage.dismiss(); 
      this.navCtrl.push(TabsPage);  
    }, err => {
      loadMessage.dismiss();
      this.showAlert("Could not sign you in. Try again!"); 
    });
  } // loginWithFacebook

  showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Oh my ..',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present(); 
  }
}
