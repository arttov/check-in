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

  constructor() {}

  ngOnInit() {
    this.generateUpdatedTime();
    this.convertDistance();
  }

  // convert users distance
  convertDistance() {

    let decimalZero = this.user.dis.toString()[0],
        dist = this.user.dis;

    if(decimalZero == '0') {
      this.distance = Number(Math.round(dist + 1) + 'e-' + 1);
    } else {
      this.distance = dist;
    }

    this.distance = this.distance.toFixed(1);
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
