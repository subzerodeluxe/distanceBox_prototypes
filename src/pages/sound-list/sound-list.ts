import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

// import pages
import { AddSoundPage } from '../add-sound/add-sound';

@Component({
  selector: 'page-sound-list',
  templateUrl: 'sound-list.html'
})
export class SoundListPage {
   

  constructor(public navCtrl: NavController) {
    
  }

  
  
  addNewRecording() {
    this.navCtrl.push(AddSoundPage); 
  }
}
