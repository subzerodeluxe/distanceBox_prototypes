import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// import pages and services 
import { BlackJackTipsPage } from '../black-jack-tips/black-jack-tips';
import { TimezoneService } from "../../providers/timezone-service";
import { AuthService } from "../../providers/auth-service";
import * as moment from 'moment';
import { WeatherService } from "../../providers/weather-service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthService, TimezoneService]
})

export class ProfilePage {
  
  blackJackTips = BlackJackTipsPage; 
  correctDate: any; 
  correctTime: any;
  gotTime: boolean = false; 
  globalTime: any; 
  finalTimeStamp: any; 
  receivedCode: any; 
  checkTime: any; 
  selectedCity: any; 
  showTemp: any; 
  iconList: any; 
  correctIcon: any; 
  weatherTable: {}

  constructor(public navCtrl: NavController, public alertCtrl: 
  AlertController, public weather: WeatherService, public time: TimezoneService) {
    
  }
  
  ngOnInit() {
    //this.correctTime = "Please select a city"!; 

    var cityCode = 'Asia/Jakarta'; 
    this.startTime(cityCode); 

    this.selectedCity = "Yogjakarta"; 

    this.weatherTable = 
    {
      "800-800": "sunny",
      "300-550": "rainy",
      "801-810": "cloudy",
      "200-250": "thunderstorm"
    }

  
  } // ngOnInit() 

  getWeather(receivedCode) {
    console.log("RECEVEID CODE = " + receivedCode);
    if(receivedCode === "Asia/Jakarta") {
      var cityID = 'id=1621177'; 
    } else {
      cityID = 'id=2746301';
    }

    this.weather.getWeatherByCity(cityID).subscribe(data => {   
      // transform temp to string 
      var responseTemp = data.main.temp.toString(); 
      console.log("C'est une object? " + JSON.stringify(data)); 
      this.showTemp = responseTemp.substr(0,2);

      // get weather.id 
      var weatherID = data.weather[0].id; 
      
      console.log(weatherID);
      
      var pL = /(\d+)-\d+/;
      var pR = /\d+-(\d+)/;
      for (let key in this.weatherTable) {
         var value = this.weatherTable[key];
         
         var startGetal = pL.exec(key)[1];
         var eindGetal = pR.exec(key)[1];
         
         console.log("Startgetal: " + startGetal);
        console.log("Eindgetal: " + eindGetal);

         if(weatherID >= Number.parseInt(startGetal) && weatherID <= Number.parseInt(eindGetal) || weatherID == Number.parseInt(startGetal)) 
         {
           this.correctIcon = value; 
           console.log("code is: " + value);
         }
         else { 
           console.log("blablalbasllbab");
         }
      }
    })
  }

 
  cityChange(code) {
    this.receivedCode = code; 
    console.log(this.receivedCode); 

    if(this.receivedCode == 'Europe/Amsterdam') {
      clearTimeout(this.checkTime);
      this.gotTime = false;
      this.startTime(this.receivedCode); 

      this.getWeather(this.receivedCode); 
      
    } else {
      clearTimeout(this.checkTime); 
      this.gotTime = false; 
      this.startTime(this.receivedCode); 

      this.getWeather(this.receivedCode); 
    }
  }

  
  getTime(code) {
    this.time.getTimeByCity(code).subscribe(
      data => {
          console.log('Get Time response ' + JSON.stringify(data));
          var foreignTime = new Date(data.timestamp*1000);
          var foreignHours = foreignTime.getUTCHours();
          this.finalTimeStamp = foreignTime.setHours(foreignHours);
          var finalTime = new Date(this.finalTimeStamp);
          
          console.log("finalTime: " + finalTime); 

          // set correctDate 
          this.correctDate = this.formatDate(finalTime); 
      
          // SET GLOBALTIME 
          this.globalTime = finalTime; 
        },
        err => {
          this.showAlert(); 
        },
        () => console.log('Completed!')
    );
  } // getTime() 


  startTime(cityCode) {
  
    if (this.gotTime == false) {
      this.getTime(cityCode); 
      this.gotTime = true; 
    } 
  
    this.checkTime = setTimeout(() => {

      var hours = this.globalTime.getHours();
      var localMinutes = new Date().getMinutes(); 
      this.globalTime.setMinutes(localMinutes);
      var minutes = this.globalTime.getMinutes();
      var localSeconds = new Date().getSeconds();
      this.globalTime.setSeconds(localSeconds);
      var seconds = this.globalTime.getSeconds();
      
      this.correctTime = moment(this.globalTime).format('hh:mm:ss a');
      var consoleTime = moment(this.globalTime).format('hh:mm:ss a'); 
      console.log(consoleTime);

      this.startTime(cityCode);
    }, 1000) 
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
  } // formatDate() 

   showAlert() {
    let alert = this.alertCtrl.create({
        title: 'Bad connection?',
        message: 'Problem getting correct time. Please try again',
        buttons: ['OK']
        });
      alert.present();
  } // showAlert

}
