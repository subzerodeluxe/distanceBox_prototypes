import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import services/ providers
import { ImagesService } from '../services/images'
import { AngularFireModule } from 'angularfire2';
import { AuthProvider} from '../providers/auth-provider'  


// import pages
import { SoundListPage } from '../pages/sound-list/sound-list';
import { ImageListPage } from '../pages/image-list/image-list';
import { TabsPage } from '../pages/tabs/tabs';
import { AddSoundPage } from '../pages/add-sound/add-sound';
import { MediaListPage } from '../pages/media-list/media-list';
import { TakePicturePage } from '../pages/take-picture/take-picture';
import { LoginPage } from '../pages/login/login';


// setup Firebase credentials 
export const firebaseConfig = {
    apiKey: "AIzaSyB9j6apbWkYb02Qjr8C4SPdZWO_lRC_WWg",
    authDomain: "distancebox.firebaseapp.com",
    databaseURL: "https://distancebox.firebaseio.com",
    storageBucket: "distancebox.appspot.com",
    messagingSenderId: "116109602089"
};

@NgModule({
  declarations: [
    MyApp,
    SoundListPage,
    ImageListPage,
    TabsPage,
    AddSoundPage,
    MediaListPage,
    TakePicturePage,
    LoginPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SoundListPage,
    ImageListPage,
    TabsPage,
    AddSoundPage,
    MediaListPage,
    TakePicturePage,
    LoginPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  ImagesService, AuthProvider]
})
export class AppModule {}
