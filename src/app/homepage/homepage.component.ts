import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  dates: any;
  errorMessage: string;
  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this._projectService.getAllUser()
      .subscribe(
        (res) => {
          this.dates = res;
        },
        error => {
          this.errorMessage = JSON.parse(error._body);
        }
      );
  }

  /**
   *
   * @param data
   */
  addData(data) {
    this.dates.unshift(data);
  }

}
