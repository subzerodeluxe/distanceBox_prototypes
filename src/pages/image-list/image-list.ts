import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

// import pages
import { StoryModalPage } from '../story-modal/story-modal';
import { ImagesService } from '../../services/images';
import { Image } from '../../models/image'; 


@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html'
})
export class ImageListPage {

  // Properties
  imageUrl = '';
  stories: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, private imagesService: ImagesService,
  private angFire: AngularFire, private modalCtrl: ModalController, private platform  : Platform) {}

  ionViewDidLoad()
   {
      this.platform.ready()
      .then(() =>
      {
         this.stories = this.angFire.database.list('/stories');
      });
   }

  addRecord()
   {
      let modal = this.modalCtrl.create(StoryModalPage);
      modal.present();
   }

  editStory(story)
   {
      let params = { story: story, isEdited: true },
          modal  = this.modalCtrl.create(StoryModalPage, params);

      modal.present();
   }



   deleteStory(story : any)
   {
      this.stories.remove(story);
   }

}
