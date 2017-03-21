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
  returnObject: any; 
  globalTime :any; 
  hourDelta: number; 

  constructor(public navCtrl: NavController, 
  private auth: AuthProvider, private timeZone: Timezone, public navParams: NavParams) {}

  

  getTime (cityCode) {
    console.log("CityCode: " + cityCode); 
    if (cityCode == "tilburg") {
      var city = "Europe/Amsterdam";
    } else {
      var city = "Asia/Jakarta"; 
    }

    
    
    return this.timeZone.getTimeByCity(city)
    .subscribe(resp => {
   
     
      console.log(resp);

      var foreignTime = new Date(resp.timestamp*1000);
    
      var foreignHours = foreignTime.getUTCHours();
      
      console.log(foreignHours);
      //var localHoursOffset = foreignTime.getTimezoneOffset()/60;

      var localHours = new Date().getUTCHours(); 
      console.log(localHours);
      var finalTimeStamp = foreignTime.setHours(foreignHours);
      
      var finalTime = new Date(finalTimeStamp);
      
      // set correctDate 
      this.correctDate = this.formatDate(finalTime); 

     
    
      this.globalTime = finalTime; 
     
     
      
    })
    
  }

  startTime(city) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    if (this.gotTime == false) {
     
      this.gotTime = true; 
      this.getTime(city); 
    } 
      
    var t = setTimeout(() => {
      //console.log(this.globalTime);
      // Hours part from the timestamp
      
      var hours = this.globalTime.getHours();
      // Minutes part from the timestamp
      var localMinutes = new Date().getMinutes(); 
      this.globalTime.setMinutes(localMinutes);
      var minutes = this.globalTime.getMinutes();
      // Seconds part from the timestamp
      var localSeconds = new Date().getSeconds();
      this.globalTime.setSeconds(localSeconds);
      var seconds = this.globalTime.getSeconds();
      
      //console.log(seconds);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);
    
      // set correct time via property binding 
      this.correctTime = hours + ":" + minutes + ":" + seconds;
      
      
      
      this.time = this.correctTime;
      //console.log(this.globalTime);
       //this.time = this.globalTime;
      this.startTime(city);
      }, 1000) 
    
  }
  

  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    //console.log(i);
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
