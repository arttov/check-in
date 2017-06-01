import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';
import { ILocation } from "../interface/location";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
  @Output('updateUserList') updateUserList: EventEmitter<any> = new EventEmitter();

  // default data for map
  location: ILocation = {
    longitude : 40.3855031,
    latitude : 45.364846
  };

  zoom = 18;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this._projectService.getLocation(this.onLocationChange.bind(this));
  }

  // get current location in service
  onLocationChange(showPosition) {
    this.location.longitude = showPosition.coords.longitude;
    this.location.latitude = showPosition.coords.latitude;
  }
}

