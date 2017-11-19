import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { WebServiceProvider } from '../../providers/web-service/web-service';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private webservice:WebServiceProvider) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap(){
    let options = {timeout:1000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options).then((position) => {
      let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.map, "current position", latlng);
      var sEventName = '';
      this.webservice.getNearbyEvents(position.coords.latitude, position.coords.longitude).subscribe((events) => {
        
        for(var i = 0; i< Object.keys(events.events).length; i++){
          sEventName = '';  
          if(events.events[i].location.coordinates[1] != null && events.events[i].location.coordinates[1] != null){
            let loc = new google.maps.LatLng(events.events[i].location.coordinates[1], events.events[i].location.coordinates[0]);
            if(events.events[i].eventName != null){
              sEventName = events.events[i].eventName;
            }
            this.addMarker(this.map,events.events[i].eventName,loc);
          }
        }
      });

      //this.addMarker(this.map, "current position", latlng);
    },(err: PositionError)=>{
      console.log("error: "+err.message);
    }); 
    
  }

  addMarker(map, title, latlng){
      var res = new google.maps.Marker({
          position: latlng,
          map: map,
          title:title,
          animation: google.maps.Animation.DROP
      });
      return res;
  }

}
