import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Image } from '../../models/image'; 

// import pages
import { TakePicturePage } from '../take-picture/take-picture';
import { ImagesService } from '../../services/images';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html'
})
export class ImageListPage {

  // Properties
  imageUrl = '';
  images: Image[] = []; 

  constructor(public navCtrl: NavController, private imagesService: ImagesService) {}

  addNewPicture() {
    this.navCtrl.push(TakePicturePage);
  }

  ionViewWillEnter() {
    this.images = this.imagesService.loadImages(); 
  }

}
