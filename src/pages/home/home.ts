import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { google } from 'google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map: any;
  currentPos: Geoposition;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap(){

    this.getUserPosition();

    let mapOptions = {
      center: this.currentPos,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.map, "current position", this.currentPos);
    
  }

  getUserPosition(){
    let options = {timeout:1000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options).then((position) => {
      this.currentPos = position;
      console.log(position);
      //let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
  }

}
