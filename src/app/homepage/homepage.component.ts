import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  users: any;
  errorMessage: string;

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this.getAllUser();
  }

  /**
   * This function is used to get all user ind DB
   */
  getAllUser() {
    this._projectService.getAllUser()
      .subscribe(
        (res) => {
          this.users = res;
        },
        error => {
          if(error._body) {
            this.errorMessage = JSON.parse(error._body);
          }
        }
      );
  }

  /**
   * Function for emitter new user name data
   *
   * @param data
   */
  updateUserList() {
    this.getAllUser();
  }
}
