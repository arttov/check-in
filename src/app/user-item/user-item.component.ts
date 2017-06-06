import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})

export class UserItemComponent implements OnInit {
  @Input() user: any;
  diffDate: number;
  distance: any;
  dateText: string;
  minimalDistance: number = 0.1;

  constructor() {}

  ngOnInit() {
    this.generateUpdatedTime();
    this.convertDistance();
  }

  // convert users distance for show in list
  convertDistance() {

    let dist = this.user.dis;

    if (dist <= this.minimalDistance && dist !== 0) {
      this.distance = this.minimalDistance;
    } else {
      this.distance = dist;
    }

    this.distance = +this.distance.toFixed(1);
  }


  /**
   * This function is used to generate last updated time for user list
   */
  generateUpdatedTime() {

    //generate last updated time ago for each user in list
    let dateString = this.user.obj.updated,
        newDate = new Date(dateString);

    //get different date by day
    let currentDate = new Date();
    this.diffDate = currentDate.getDate() - newDate.getDate();
    this.dateText = 'days';

    //check date status
    if (this.diffDate < 1) {
      this.diffDate = currentDate.getHours() - newDate.getHours();
      this.dateText = 'hours';
    }

    if (this.diffDate < 1){
      this.diffDate = currentDate.getMinutes() - newDate.getMinutes();
      this.dateText = 'minutes';
    }

    if (this.diffDate < 1){
      this.diffDate = currentDate.getSeconds() - newDate.getSeconds();
      this.dateText = 'seconds';
    }
  }

}
