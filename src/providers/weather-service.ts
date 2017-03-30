import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherService {

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

   getWeatherByCity(city) {
    console.log("Incoming code " + city); 
    var baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
    var cityID = encodeURI(city); 
    var apiKey = '&appid=945ef326dc38e1fd4ebcfbb9ccbac6d2'; 
    var units = '&units=metric'; 
    
    var url = baseURL + cityID + units + apiKey; 
    console.log("The final URL " + url);
    // get json schema 
    var response = this.http.get(url)
      .map(res => res.json())
     //.map((data) => data.main.temp)
      
    return response; 
    
  }


}
