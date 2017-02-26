import { Component } from '@angular/core';

import { ImageListPage } from '../image-list/image-list';
import { SoundListPage } from '../sound-list/sound-list';
import { MediaListPage } from '../media-list/media-list';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  soundList: any = SoundListPage;
  imageList: any = ImageListPage; 
  mediaList: any = MediaListPage; 

  constructor() {

  }
}
