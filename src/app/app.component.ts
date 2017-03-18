import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import images 
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'; 
import { ProfilePage } from '../pages/profile/profile';
import { WordsPage } from '../pages/words/words'; 
import { AuthProvider } from '../providers/auth-provider';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  loginPage = LoginPage; 
  tabsPage = TabsPage; 
  profilePage = ProfilePage; 
  wordsPage = WordsPage; 
  
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private auth: AuthProvider, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logOut() {
    this.auth.logout(); 
    this.nav.setRoot(this.loginPage);
    this.menuCtrl.close(); 
    
  }

}
