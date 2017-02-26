import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MediaPlugin } from 'ionic-native'

@Component({
  selector: 'page-add-sound',
  templateUrl: 'add-sound.html'
})
export class AddSoundPage {

  media: MediaPlugin 

  //runs when the page has fully entered and is now the active page.
  ionViewDidEnter() {
    this.media = new MediaPlugin('../Library/NoCloud/recording.wav');
  }
  
  constructor(private alertCtrl: AlertController) { 
  }

  startRecording() {
    try {
      console.log("kut"); 
      this.media.startRecord();
      
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  stopRecording() {
  try {
    this.media.stopRecord();
  }
  catch (e) {
    this.showAlert('Could not stop recording.');
  }
}

startPlayback() {
  try {
    this.media.play();
  }
  catch (e) {
    this.showAlert('Could not play recording.');
  }
}

stopPlayback() {
  try {
    this.media.stop();
  }
  catch (e) {
    this.showAlert('Could not stop playing recording.');
  }
}
  
  showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Oh my ..',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present(); 
  }

}
