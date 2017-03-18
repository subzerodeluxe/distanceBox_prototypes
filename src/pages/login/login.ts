import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// import pages and services 
import { AuthProvider } from '../../providers/auth-provider';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  error: any;

 
  constructor(public navCtrl: NavController, 
  private fb: FormBuilder, public auth: AuthProvider) {   

  }
 

  loginWithFacebook(): void{
    this.auth.loginWithFacebook().subscribe((success) => {
      console.log(success);
      this.navCtrl.push(TabsPage);  
    }, err => {
      console.log(err);
    });
  } // loginWithFacebook

}
