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
  gotTime: boolean = false;
  globalTime :any; 
  
  constructor(public navCtrl: NavController, 
  private auth: AuthProvider, private timeZone: Timezone, 
  public navParams: NavParams) {}

  getTime (cityCode) {
   
    return this.timeZone.getTimeByCity(cityCode)
    .subscribe(resp => {
   
      var foreignTime = new Date(resp.timestamp*1000);
      var foreignHours = foreignTime.getUTCHours();
      var localHours = new Date().getUTCHours(); 
      var finalTimeStamp = foreignTime.setHours(foreignHours);
      var finalTime = new Date(finalTimeStamp);

      // set correctDate 
      this.correctDate = this.formatDate(finalTime); 
      // check nightTime
      console.log(resp.formatted); 
      this.checkNight(resp.formatted); 
      this.globalTime = finalTime; 
    })
    
  }

  startTime(cityCode) {
  
    if (this.gotTime == false) {
      this.getTime(cityCode); 
      this.gotTime = true; 
    } 
  
    var t = setTimeout(() => {
     
      var hours = this.globalTime.getHours();
      var localMinutes = new Date().getMinutes(); 
      this.globalTime.setMinutes(localMinutes);
      var minutes = this.globalTime.getMinutes();
      var localSeconds = new Date().getSeconds();
      this.globalTime.setSeconds(localSeconds);
      var seconds = this.globalTime.getSeconds();
      
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);
    
      // set correct time via property binding 
      this.correctTime = hours + ":" + minutes + ":" + seconds;
      this.time = this.correctTime;
      this.startTime(cityCode);
      }, 1000) 
  }

  checkCity(city) {
    console.log("Incoming city " + city);
      if (city == "tilburg") {
        var cityCode = "Europe/Amsterdam";
        console.log(cityCode);
        this.startTime(cityCode);
      } else {
        var cityCode = "Asia/Jakarta"; 
        console.log(cityCode); 
        this.startTime(cityCode); 
      }
  }
  
  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }


  formatDate(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];

    var dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday", 
    ];

    var day = date.getDate();
    var dayIndex = date.getDay(); 
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return dayNames[dayIndex] + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  checkNight(time) {
    var correctTime = time.substr(11, 18);
    var hours = Number(correctTime.substr(0, 2)); 
    
    if ((hours >= 0 && hours <= 5) || (hours >= 18 && hours <= 23)) {
        this.nightTime = true; 
      } else {
        this.nightTime = false; 
      } 
  }

}
