import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms'; 
import { Camera } from 'ionic-native';
import { ImagesService } from '../../services/images'; 

// import pages
import { ImageListPage } from '../image-list/image-list';

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html'
})

export class TakePicturePage {

  // Properties
  imageUrl = ''; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagesSerivce: ImagesService) {}

  onSubmit(form: NgForm) {
    this.imagesSerivce.addImage(form.value.title, form.value.description, this.imageUrl, form.value.date, form.value.user); 
    form.reset();
    this.imageUrl = '';  
  }

  takePicture() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          //this.navCtrl.push(ImageListPage, {imageData}); 
          this.imageUrl = imageData; 
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      ) 
    console.log("Snap"); 
  }

}
