import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Timezone {

  constructor(public http: Http) {
    
  }

  getTimeByCity(city) {
    var baseURL = 'http://api.timezonedb.com/v2/get-time-zone?';
    var apiKey = 'key=G9QRN4GYTVN1&format=json'; 
    var cityBase = '&by=zone&zone=';
    var cityCode = encodeURI(city);

    //Europe/Amsterdam
    //Asia/Jakarta

    //var cityCode = encodeURI(city);
    var url = baseURL + apiKey + cityBase + cityCode; 
  
    var response = this.http.get(url)
    .map(res => res.json());
    return response;
  
  }

}

