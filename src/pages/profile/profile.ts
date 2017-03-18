import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages and services 
import { AuthProvider } from '../../providers/auth-provider';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private auth: AuthProvider, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
