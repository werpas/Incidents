import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WebServiceProvider {

  constructor(public http: Http) {
    
  }

  getNearbyEvents(lat,lng){
    //console.log('https://werpas-event-svc.cfapps.io/api/v1/near?long='+lng+'&lat='+lat+'&limit=100&sort=eventDesc&order=desc&radius=1000');
    return this.http.get('https://werpas-event-svc.cfapps.io/api/v1/near?long='+lng+'&lat='+lat+'&limit=100&sort=eventDesc&order=desc&radius=1000')
        .map(res => res.json());
  }

}
