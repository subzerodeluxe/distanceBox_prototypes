//import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

// import pages
import { Image } from '../models/image'; 


//@Injectable()
export class ImagesService {

  //onstructor(public http: Http) {
   // console.log('Hello Images Provider');
 // }/

  private images: Image[] = []; 

  addImage(title: string, description: string, 
  imageUrl: string, user: string, date: any) {

    const image = new Image(title, description, user, imageUrl, date);
    this.images.push(image);  
  }

  loadImages() {
      return this.images.slice(); 
  }
}
