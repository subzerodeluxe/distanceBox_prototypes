import { Component, Input } from '@angular/core';
import { AlertController } from "ionic-angular";

// interface 
import { ICountdown } from "../i-countdown/i-countdown";

@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})
export class CountdownComponent {

   @Input() timeInSeconds: number;
    
    public countdown: ICountdown;

    constructor(public alertCtrl: AlertController) {}

    ngOnInit() {
        this.initTimer();
    }

    hasFinished() {
        return this.countdown.hasFinished;
    }

    initTimer() {
        if(!this.timeInSeconds) { 
          this.timeInSeconds = 0; 
        }

        this.countdown = <ICountdown>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.countdown.displayTime = this.getSecondsAsDigitalClock(this.countdown.secondsRemaining);
        this.countdown.displayDate = this.formatDate(this.countdown.secondsRemaining); 
        this.countdown.daysLeft = this.getDaysLeft(this.countdown.secondsRemaining); 

       
    }

    startTimer() {
        this.countdown.hasStarted = true;
        this.countdown.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.countdown.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.countdown.runTimer) { return; }
            this.countdown.secondsRemaining--;
            this.countdown.displayTime = this.getSecondsAsDigitalClock(this.countdown.secondsRemaining);
            if (this.countdown.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.countdown.hasFinished = true;
                // show Alert 
                let alert = this.alertCtrl.create({
                  title: 'Time \'\s up!',
                  buttons: ['OK']
                })
                alert.present(); 
               
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

    getDaysLeft(inputSeconds: number) {
        // REVERSE THE MAGIC: SET CURRENT DATE AND SECONDS 
        var currentDate = new Date(); 
        var newHours = currentDate.setHours(2); 
        var newMinutes = currentDate.setMinutes(0);
        var newSeconds = currentDate.setSeconds(0); 


        var currentSeconds = currentDate.getTime() / 1000; 

        // CALCULATE FINAL SECONDS 
        var final = inputSeconds + currentSeconds; 
        var deadline = new Date(final *1000); 

        // THE MAGIC 
        var msPerDay = 24 * 60 * 60 * 1000;
        var timeLeft = (deadline.getTime() - currentDate.getTime());
        var e_daysLeft = timeLeft / msPerDay;
        var daysLeft = Math.floor(e_daysLeft);
      
        console.log("Days left: " + daysLeft); 

        return daysLeft.toString() + " " + " Days left"; 
    }  

    formatDate(inputSeconds: number) {

      console.log("Deze seconden komen binnen: " + inputSeconds); 

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

      // REVERSE THE MAGIC: SET CURRENT DATE AND SECONDS 
      var currentDate = new Date(); 
      var newHours = currentDate.setHours(2); 
      var newMinutes = currentDate.setMinutes(0);
      var newSeconds = currentDate.setSeconds(0); 
      var currentSeconds = currentDate.getTime() / 1000; 

      // CALCULATE FINAL SECONDS 
      var final = inputSeconds + currentSeconds; 
      var newDate = new Date(final *1000); 

      console.log("Final seconds " + final); 
      var day = newDate.getDate();
      var dayIndex = newDate.getDay(); 
      var monthIndex = newDate.getMonth();
      var year = newDate.getFullYear();

      return dayNames[dayIndex] + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
     

    }

    

}