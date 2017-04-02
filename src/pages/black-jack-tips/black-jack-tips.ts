import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// import pages ande services 
import { WeatherService } from "../../providers/weather-service";
import { TimezoneService } from "../../providers/timezone-service";
import * as moment from 'moment';


@Component({
  selector: 'page-black-jack-tips',
  templateUrl: 'black-jack-tips.html'
})
export class BlackJackTipsPage {
 
  // properties
  weatherTable = {};
  showTemp: any; 
  correctIcon: any; 
  receivedCode: any; 
  selectedCity: any; 
  weatherDescription: any; 
  fetchingData: boolean = false; 
    // Tilburg
    correctTilburgDate: any; 
    correctTilburgTime: any; 
    fetchedTilburgData: boolean = false; 

    // Yogja 
    correctYogjaDate: any; 
    correctYogjaTime: any; 
    fetchedYogjaData: boolean = false; 


  constructor(public navCtrl: NavController, 
  public weather: WeatherService, 
  public time: TimezoneService, 
  public navParams: NavParams,
  public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlackJackTipsPage');
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

    this.fetchingData = true; // start spinner to indicate fetching time and date 
    this.getTime('Europe/Amsterdam'); 
    this.getWeather('Europe/Amsterdam'); 
    this.selectedCity = "Tilburg";

  } // ngOnInit() 

   cityChange(code) {    
    if(code == 'Tilburg') {

      this.receivedCode = 'Europe/Amsterdam'; 

      this.fetchingData = true; // start spinner to indicate fetching time and date 
      
      // get time snapshot 
      this.getTime(this.receivedCode); 

      // get weather 
      this.getWeather(this.receivedCode); 

      // only show Tilburg date, hide Yogja date 
      this.fetchedTilburgData = true; 
      this.fetchedYogjaData = false; 
    } else {
      this.receivedCode = 'Asia/Jakarta'; 

      this.fetchingData = true; // start spinner to indicate fetching time and date 
     
      // get time snapshot
      this.getTime(this.receivedCode);

      // get weather 
      this.getWeather(this.receivedCode); 

      // only show Yogja date, hide Tilburg date 
      this.fetchedYogjaData = true;
      this.fetchedTilburgData = false;
    }
  } // cityChange 
  

  getTime(receivedCode) {
    this.time.getTimeByCity(receivedCode).subscribe(
      data => {
        console.log("Date object" + JSON.stringify(data));
        var finalTime = new Date(data.formatted);
        console.log("Final time: " + finalTime);
        this.correctTilburgTime = moment(finalTime).format('hh:mm a');
        this.correctTilburgDate = this.formatDate(finalTime); 
        this.fetchingData = false; // got data, hide spinner 
        if (this.receivedCode == 'Europe/Amsterdam') {
           this.fetchedTilburgData = true; 
        } else {
          this.fetchedYogjaData = true; 
        }
      },
      err => this.showErrorMessage() 
    ); 
  }

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

      // get weather description
      this.weatherDescription = data.weather[0].description; 
      
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

    formatDate(date) {  
      var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
      ];

      var dayNames = [
        "Sun", "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat", 
      ];

      var day = date.getDate();
      var dayIndex = date.getDay(); 
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return dayNames[dayIndex] + ' ' + day + ' ' + monthNames[monthIndex];
    } // formatDate() 

    showErrorMessage() {
      let alert = this.alertCtrl.create({
        title: "Bad connection",
        message: "Could not fetch time. Please try again",
        buttons: ['OK']
      });
      alert.present(); 
    }


}
