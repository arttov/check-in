import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../validation.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrls: ['./check-in-modal.component.css']
})

export class CheckInModalComponent implements OnInit {

  form: FormGroup;
  errorMessage: any;

  @Output('onAddData') onAddData: EventEmitter<any> = new EventEmitter();

  @Input() lat: number;
  @Input() lng: number;

  constructor(private change: Router, private fb: FormBuilder, private _projectService: ProjectService) {}

  ngOnInit() {
    this.errorMessage = null;
    this.initUserForm();
  }

  initUserForm() {
    // create form validation
    this.form = this.fb.group({
        'name': ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2), ValidationService.userNameValidator]]
      }
    );
  }

  /**
   *
   * @param data
   */
  saveUserData(data: any) {

    if (data.name.length > 0) {

      data.latitude = this.lat;
      data.longitude = this.lng;

      this._projectService.postUser(data)
        .subscribe(
          (res) => {
            this.errorMessage = null;
            this.onAddData.emit(res);

          },
          error => {
            this.errorMessage = JSON.parse(error._body);
          }
        );
    }
  }
}
