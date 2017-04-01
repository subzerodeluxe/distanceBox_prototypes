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
  
  // page properties 
  blackJackTips = BlackJackTipsPage; 
  
  // weather and time properties 
  weatherTable: {}
  correctTime: any;
  showTemp: any; 
  correctIcon: any; 

    // Tilburg properties 
    correctTilburgDate: any; 
    gotTilburgTime: boolean = false;
    tilburgTime: any; 
    // Yogja properties 
    correctYogjaDate: any; 
    gotYogjaTime: boolean = false; 
    yogjaTime: any; 
  
  finalTimeStamp: any; 
  receivedCode: any; 
  checkTime: any; 
  selectedCity: any; 

  // Spinner properties 
  searching: any = false; 
  fetchedTime: boolean = false; 
  fetchedTilburgDate: boolean = false; 
  fetchedYogjaDate: boolean = false; 
  fetchingData: boolean = false; 


  constructor(public navCtrl: NavController, public alertCtrl: 
  AlertController, public weather: WeatherService, public time: TimezoneService) {
    
  }
  
  ngOnInit() {

    this.weatherTable = {
      "200-232": "wi wi-owm-200", // thunderstorm
      "300-321": "wi wi-owm-301", // drizzle 
      "500-532": "wi wi-owm-302", // rain 
      "600-621": "wi wi-owm-621", // snow 
      "800-800": "wi wi-owm-800", // sunny 
      "801-804": "wi wi-owm-804",  // cloudy 
      "904-904": "wi wi-owm-904" // hot 
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
      console.log("Weather object: " + JSON.stringify(data)); 
      this.showTemp = responseTemp.substr(0,2);

      // get weather.id 
      var weatherID = data.weather[0].id; 
      
      var pL = /(\d+)-\d+/;
      var pR = /\d+-(\d+)/;
      for (let key in this.weatherTable) {
         var value = this.weatherTable[key];
         
         var startGetal = pL.exec(key)[1];
         var eindGetal = pR.exec(key)[1];

         if(weatherID >= Number.parseInt(startGetal) && weatherID <= Number.parseInt(eindGetal) || weatherID == Number.parseInt(startGetal)) 
          {
            this.correctIcon = value; 
            console.log("code is: " + value);
          }
        } 
      }) // getWeatherByCity
    } // getWeather

 
  cityChange(code) {
    
    this.receivedCode = code; 
    this.fetchingData = true; // start spinner to indicate fetching time and date 
        
    if(this.receivedCode == 'Europe/Amsterdam') {
      clearTimeout(this.checkTime);
      
      this.startTime(this.receivedCode); 

      // only show Tilburg date, hide Yogja date 
      this.fetchedTilburgDate = true; 
      this.fetchedYogjaDate = false; 
      this.fetchedTime = false;

      // get weather 
      this.getWeather(this.receivedCode); 

    } else {
      
      clearTimeout(this.checkTime); 
      
      this.startTime(this.receivedCode); 

      /// only show Yogja date, hide Tilburg date 
      this.fetchedYogjaDate = true;
      this.fetchedTilburgDate = false; 
      this.fetchedTime = false; 
      
      this.getWeather(this.receivedCode); 
    }
  } // cityChange 

  
  getTime(code) {
      console.log("WHAT IS THE TIME?? " + code); 
    switch(code) {
      case 'Asia/Jakarta': 
        this.time.getTimeByCity(code).subscribe(
        data => {
          /*console.log('Get Time response ' + JSON.stringify(data));
          var foreignTime = new Date(data.timestamp*1000);
          console.log("Deze tijd dan? " + foreignTime); 
          var foreignHours = foreignTime.getUTCHours();
          this.finalTimeStamp = foreignTime.setHours(foreignHours);
          var finalTime = new Date(this.finalTimeStamp);*/

          var finalTime = new Date(data.formatted);
          
          console.log("finalTime: " + finalTime); 


          // SET GLOBALTIME 
          this.yogjaTime = finalTime; 
          
          // set correctDate 
          this.correctYogjaDate = this.formatDate(finalTime); 
      
          },
          err => {
            console.log(err);
          },
          () => console.log('Completed!')
      ) 
      break; 

      case 'Europe/Amsterdam': 
        this.time.getTimeByCity(code).subscribe(
        data => {
         /* console.log('Get Time response ' + JSON.stringify(data));
          var foreignTime = new Date(data.timestamp*1000);
          console.log("Deze tijd dan? " + foreignTime); 
          var foreignHours = foreignTime.getUTCHours();
          console.log("foreignHours? " + foreignHours); 
          this.finalTimeStamp = foreignTime.setHours(foreignHours);
          console.log("finalTimeStamp: " + this.finalTimeStamp); */ 
          var finalTime = new Date(data.formatted);
           
          // SET GLOBALTIME 
          //this.tilburgTime = new Date(this.finalTimeStamp);
          this.tilburgTime = finalTime; 
          
          console.log("finalTime: " + finalTime); 
          
          // set correctDate 
          this.correctTilburgDate = this.formatDate(finalTime); 
          this.fetchedTilburgDate = true; 
          
        
        },
        err => {
          console.log(err);
        },
        () => console.log('Completed!')
      );
    } // switch 
  } // getTime() 


startTime(cityCode) {
   
    console.log("GIVE ME THE GODDAMN CODE: " + cityCode);

    switch(cityCode){
      case 'Asia/Jakarta': 
        if (this.gotYogjaTime == false) {
          this.getTime(cityCode); 
          this.gotYogjaTime = true; 
          
          this.fetchedYogjaDate = true; 
        } 
  
        this.checkTime = setTimeout(() => {

        var hours = this.yogjaTime.getHours();
        var localMinutes = new Date().getMinutes(); 
        this.yogjaTime.setMinutes(localMinutes);
        var minutes = this.yogjaTime.getMinutes();
        var localSeconds = new Date().getSeconds();
        this.yogjaTime.setSeconds(localSeconds);
        var seconds = this.yogjaTime.getSeconds();
        
        this.correctTime = moment(this.yogjaTime).format('hh:mm:ss a');
        this.fetchingData = false; 
        this.fetchedTime = true; 
      
        var consoleTime = moment(this.yogjaTime).format('hh:mm:ss a'); 
        console.log(consoleTime);

        this.startTime(cityCode);
        }, 1000) 
        
        break; 
      
      case 'Europe/Amsterdam': 

        if (this.gotTilburgTime == false) {
          this.getTime(cityCode); 
          this.gotTilburgTime = true; 

          this.fetchedTilburgDate = true; 
         
        } 
  
        this.checkTime = setTimeout(() => {

        var hours = this.tilburgTime.getHours();
        var localMinutes = new Date().getMinutes(); 
        this.tilburgTime.setMinutes(localMinutes);
        var minutes = this.tilburgTime.getMinutes();
        var localSeconds = new Date().getSeconds();
        this.tilburgTime.setSeconds(localSeconds);
        var seconds = this.tilburgTime.getSeconds();
        
        this.correctTime = moment(this.tilburgTime).format('hh:mm:ss a');
        this.fetchingData = false; 
        this.fetchedTime = true; 
       
        
        var consoleTime = moment(this.tilburgTime).format('hh:mm:ss a'); 
        console.log(consoleTime);

        this.startTime(cityCode);
      }, 1000) 
    } // end of switch 

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
