import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import services and dependencies 
import { AngularFireModule } from 'angularfire2';
import { ImageService } from "../providers/image-service";
import { AuthService } from "../providers/auth-service";
import { TimezoneService } from "../providers/timezone-service";
import { WeatherService } from "../providers/weather-service";

// import pages
import { SoundListPage } from '../pages/sound-list/sound-list';
import { ImageListPage } from '../pages/image-list/image-list';
import { TabsPage } from '../pages/tabs/tabs';
import { AddSoundPage } from '../pages/add-sound/add-sound';
import { TakePicturePage } from '../pages/take-picture/take-picture';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { WordsPage } from '../pages/words/words'; 
import { BlackJackTipsPage } from '../pages/black-jack-tips/black-jack-tips';

// import components 
import { StoryModalPage } from '../components/story-modal/story-modal';



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
    TakePicturePage,
    LoginPage,
    ProfilePage,
    WordsPage,
    BlackJackTipsPage,
    StoryModalPage
    
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
    TakePicturePage,
    LoginPage,
    ProfilePage,
    WordsPage,
    BlackJackTipsPage,
    StoryModalPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  ImageService, AuthService, TimezoneService, WeatherService]
})
export class AppModule {}
