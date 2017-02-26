import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ImagesService } from '../services/images'

// import pages
import { SoundListPage } from '../pages/sound-list/sound-list';
import { ImageListPage } from '../pages/image-list/image-list';
import { TabsPage } from '../pages/tabs/tabs';
import { AddSoundPage } from '../pages/add-sound/add-sound';
import { MediaListPage } from '../pages/media-list/media-list';
import { TakePicturePage } from '../pages/take-picture/take-picture';

@NgModule({
  declarations: [
    MyApp,
    SoundListPage,
    ImageListPage,
    TabsPage,
    AddSoundPage,
    MediaListPage,
    TakePicturePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SoundListPage,
    ImageListPage,
    TabsPage,
    AddSoundPage,
    MediaListPage,
    TakePicturePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  ImagesService]
})
export class AppModule {}
