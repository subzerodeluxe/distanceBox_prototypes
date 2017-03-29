import { Component } from '@angular/core';

// import pages 
import { ImageListPage } from '../image-list/image-list';
import { SoundListPage } from '../sound-list/sound-list';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  soundList: any = SoundListPage;
  imageList: any = ImageListPage; 

  constructor() {

  }
}
