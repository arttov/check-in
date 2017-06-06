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
  loading: boolean = false;

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {}

  /**
   * This function is used to get all user ind DB
   */
  getAllUser(data: any) {

    this.loading = true;

    this._projectService.getAllUser(data)
      .subscribe(
        (res) => {
          this.loading = false;
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
  updateUserList(data?: any) {
    this.getAllUser(data);
  }
}
