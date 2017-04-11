import { Component } from '@angular/core';


@Component({
  selector: 'clock',
  templateUrl: 'clock.html'
})
export class ClockComponent {

  text: string;

  constructor() {
    console.log('Hello Clock Component');
    this.text = 'Hello World';
  }

}
