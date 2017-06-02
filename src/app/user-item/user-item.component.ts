import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})

export class UserItemComponent implements OnInit {
  @Input() user: any;
  diffDate: number;
  dateText: string;

  constructor() {}

  ngOnInit() {
    this.generateUpdatedTime();
  }

  /**
   * This function is used to generate last updated time for user list
   */
  generateUpdatedTime() {

    //generate last updated time ago for each user in list
    let dateString = this.user.updated;
    let newDate = new Date(dateString);

    let currentDate = new Date();
    this.diffDate = currentDate.getDate() - newDate.getDate();

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
