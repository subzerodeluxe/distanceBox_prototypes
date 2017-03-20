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
  correctTime: any;
  formattedDate: any;
  correctDate: any; 
  formattedTime: any; 
  time: any; 
  nightTime: boolean = false; 
  timestamp: any; 

  constructor(public navCtrl: NavController, 
  private auth: AuthProvider, private timeZone: Timezone, public navParams: NavParams) {}

 
  getTime(city) {
    if (city == "tilburg") {
      var cityCode = "Europe/Amsterdam";
    } else {
      var cityCode = "Asia/Jakarta"; 
    }

    var outcome = this.timeZone.getTimeByCity(cityCode)
    .subscribe(resp => {
      console.log(resp);
      
      //this.correctTime = this.checkNight(resp.formatted);
      //this.correctDate = resp.formatted.substr(0, 10); 
      this.correctDate = new Date(resp.timestamp*1000).toDateString(); 
      this.time = this.startTime(resp.timestamp); 
      console.log("Timestamp: " + resp.timestamp); 
    })
    
  }

  startTime(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp*1000);
    console.log("Date object: " + date + " || " + new Date())
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = date.getMinutes();
    // Seconds part from the timestamp
    var seconds = date.getSeconds();
    
    minutes = this.checkTime(minutes);
    seconds = this.checkTime(seconds);
    console.log("Sec: " + seconds + " Min: " + minutes); 
    // set correct time via property binding 
    this.correctTime = hours + ":" + minutes + ":" + seconds;
    /*var t = setTimeout(() => {
      this.startTime(timestamp), 500
    }) */
  }

  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    
    return i;
  }

  checkNight(time) {
    var correctTime = time.substr(11, 18);
    var hours = Number(correctTime.substr(0, 2)); 
    
    if ((hours >= 0 && hours <= 5) || (hours >= 18 && hours <= 23)) {
        this.nightTime = true; 
      } else {
        this.nightTime = false; 
      } 
      return correctTime; 
  }
  

  /*convertTime(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

     if ((hours >= 0 && hours <= 5) || (hours >= 18 && hours <= 23)) {
        this.nightTime = true; 
      } else {
        this.nightTime = false; 
      } 

    // Will display time in 10:30:23 format
    return this.formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }*/ 

}
