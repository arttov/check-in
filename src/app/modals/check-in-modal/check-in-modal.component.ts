import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private _projectService: ProjectService) {}

  ngOnInit() {
    this.errorMessage = null;
    this.initUserForm();
  }

  /**
   * This function is used to init form
   */
  initUserForm() {
    // create form validation
    this.form = this.fb.group({
        'name': ['', [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
          ValidationService.userNameValidator]]
      }
    );
  }

  /**
   * This function is used to save user data in db
   *
   * @param data
   */
  saveUserData(data: any) {

    if (data.name) {

      data.latitude = this.lat;
      data.longitude = this.lng;

      this._projectService.postUser(data)
        .subscribe(
          (res) => {
            this.errorMessage = null;
            // this.initUserForm();
            this.onAddData.emit(res);
          },
          error => {
            this.errorMessage = JSON.parse(error._body);
          }
        );
    }
  }

  /**
   * This function is used to reset form data
   */
  resetFormData() {
    this.initUserForm();
  }
}
