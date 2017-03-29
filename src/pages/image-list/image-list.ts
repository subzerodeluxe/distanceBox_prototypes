import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

// import pages and services and models 
import { Image } from '../../models/image';
import { ImageService } from "../../providers/image-service";
import { StoryModalPage } from "../../components/story-modal/story-modal";


@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html'
})
export class ImageListPage {

  // Properties
  imageUrl = '';
  stories: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, private imageService: ImageService,
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
