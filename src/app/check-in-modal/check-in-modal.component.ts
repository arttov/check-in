import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { ProjectService } from '../project.service';
import {ILocation} from "../interface/location";

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrls: ['./check-in-modal.component.css']
})

export class CheckInModalComponent implements OnInit {

  form: FormGroup;
  errorMessage: any;
  user: any;

  @Output('updateUserList') updateUserList: EventEmitter<any> = new EventEmitter();
  @Input() location: ILocation;

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
   */
  sendUserData() {

    if (this.form.value.name) {

      this.initCurrentLocation();
    }
  }

  /**
   * This function is used to check for saving user data nad location
   */
  checkUserData() {

    //get user name in form
    let userName = this.form.value.name;

    //save user data in local storage
    let userNameForLocalStorage = userName.toLowerCase().replace(" ", "_");
    let userNameInStorage = localStorage.getItem(userNameForLocalStorage);

    //check in user not exist
    if (!userNameInStorage) {
      this.addNewUser(userName, userNameForLocalStorage);

    } else {
      this.updateUser(userNameInStorage);
    }
  }


  /**
   *
   * @param data
   * @param userNameForLocalStorage
   */
  addNewUser(data: string, userNameForLocalStorage) {

    // GENERATE USER DATA AND SAVE IT
    this.user = Object.assign({}, {
      name : data,
      longitude: this.location.longitude,
      latitude: this.location.latitude,
    });

    this._projectService.postUser(this.user)
      .subscribe(
        (res) => {
          localStorage.setItem(userNameForLocalStorage, JSON.stringify({'id': res.id}));
          this.errorMessage = null;
          this.updateUserList.emit(res);
        },
        error => {
          this.errorMessage = JSON.parse(error._body);
        }
      );
  }

  /**
   *
   * @param userNameInStorage
   */
  updateUser(userNameInStorage) {

    let userId = JSON.parse(userNameInStorage).id;

    // GENERATE USER DATA AND SAVE IT
    this.user = Object.assign({}, {
      longitude: this.location.longitude,
      latitude: this.location.latitude,
      updated: new Date()
    });

    this._projectService.putUser(userId, this.user)
      .subscribe(
        (res) => {
          this.updateUserList.emit(res);
        },
        error => {
          this.errorMessage = JSON.parse(error._body);
        }
      );
  }

  /**
   * This function is used to init current location
   */
  initCurrentLocation() {
    this._projectService.getLocation(this.onLocationChange.bind(this));
  }

  // get current location in service
  onLocationChange(showPosition) {
    this.location.longitude = showPosition.coords.longitude;
    this.location.latitude = showPosition.coords.latitude;

    this.checkUserData();
  };

  // reset form data
  resetFormData() {
    this.initUserForm();
  }
}
