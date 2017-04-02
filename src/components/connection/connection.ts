import { Component } from '@angular/core';
import { FirebaseObjectObservable , AngularFire } from 'angularfire2'

@Component({
  selector: 'connection',
  templateUrl: 'connection.html'
})
export class ConnectionComponent {

  status: FirebaseObjectObservable<any> 
  

  constructor(public af: AngularFire) {
   this.status = this.af.database.object('.info/connected'); 
  }

}
