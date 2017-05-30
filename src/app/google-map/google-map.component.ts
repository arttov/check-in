import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Output('onAddData') onAddData: EventEmitter<any> = new EventEmitter();

  lat = 40.3855031;
  lng = 45.364846;
  zoom = 10;

  constructor() {}

  ngOnInit() {
    this.getLocation();
  }

  /**
   * This function is used to get current location for user
   */
  getLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (showPosition) => {
          this.lat = showPosition.coords.latitude;
          this.lng = showPosition.coords.longitude;
        },

        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('Your browser don\`t support HTML5');
    }
  }

}

