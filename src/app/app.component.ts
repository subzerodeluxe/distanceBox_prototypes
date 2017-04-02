import { Component, Inject, EventEmitter, Injectable, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp } from 'angularfire2'; //Add FirebaseApp


// import pages
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'; 
import { ProfilePage } from '../pages/profile/profile';
import { WordsPage } from '../pages/words/words'; 

// import services 
import { AuthService } from "../providers/auth-service";
import * as moment from 'moment';
import { TimezoneService } from "../providers/timezone-service";

// import firebase
import { Facebook } from 'ionic-native';
import { auth } from 'firebase'; //needed for the FacebookAuthProvider

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  loginPage = LoginPage; 
  tabsPage = TabsPage; 
  profilePage = ProfilePage; 
  wordsPage = WordsPage; 

  @ViewChild('nav') nav: NavController;

  correctDate: any; 
  correctTime: any;
  gotTime: boolean = false; 
  globalTime: any; 
  finalTimeStamp: any; 
  receivedCode: any; 
  checkTime: any; 
  selectedCity: any; 
  placeholder: any; 

  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;

  constructor(platform: Platform, private auth: AuthService, 
  public time: TimezoneService, public alertCtrl: AlertController, private menuCtrl: MenuController,
  @Inject(FirebaseApp)firebase: any,
  private af: AngularFire,) {

    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) { // when user is authenticated 
        this.nav.setRoot(this.profilePage);
        console.log("User object: " + JSON.stringify(user)); 
      } else {
        this.nav.setRoot(this.loginPage); 
      }
    });
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logOut() {
    this.auth.logout(); 
    this.nav.setRoot(this.loginPage);
    this.menuCtrl.close(); 
    
  }

  cityChange(code) {
    this.receivedCode = code; 
    console.log(this.receivedCode); 

    if(this.receivedCode == 'Europe/Amsterdam') {
      clearTimeout(this.checkTime);
      this.gotTime = false;
      this.startTime(this.receivedCode); 
      
    } else {
      clearTimeout(this.checkTime); 
      this.gotTime = false; 
      this.startTime(this.receivedCode); 
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
          console.log(err);
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
