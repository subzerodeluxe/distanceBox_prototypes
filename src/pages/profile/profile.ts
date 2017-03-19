import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import pages and services 
import { AuthProvider } from '../../providers/auth-provider';
import { BlackJackTipsPage } from '../black-jack-tips/black-jack-tips';
import { Timezone } from '../../providers/timezone'; 

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthProvider, Timezone]
})

export class ProfilePage {
  
  // properties
  blackJackTips = BlackJackTipsPage;
  correctTime: string = "";
  nightTime: boolean = false; 

  constructor(public navCtrl: NavController, 
  private auth: AuthProvider, private timeZone: Timezone, public navParams: NavParams) {}


  getTime(city) {
    if (city == "tilburg") {
      var cityCode = "Europe/Amsterdam";
    } else {
      var cityCode = "Asia/Jakarta"; 
    }

    var correctTime = this.timeZone.getTimeByCity(cityCode)
    .subscribe(resp => {
      console.log(resp); 
      if (resp.countryCode == "ID") {
        this.nightTime = true; 
      } else {
        this.nightTime = false; 
      }
      this.correctTime = resp.formatted; 
    })
    
  }

}
