import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';
import { ILocation } from "../interface/location";
import { ValidationService } from '../validation.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {User} from "../interface/user";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {

  @Output() updateUserList: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  user: User;
  errorMessage: any;
  userName: string = '';

  // default data for map
  location: ILocation = {
    longitude : -0.3824905,
    latitude : 51.5287336
  };

  zoom = 18;

  constructor(private fb: FormBuilder, private _projectService: ProjectService) {}

  ngOnInit() {
    this.errorMessage = null;
    this.initUserForm();
    this._projectService.getLocation(this.onLocationChange.bind(this));
  }

  /**
   * This function is used to init form
   */
  initUserForm() {

    // create form validation
    this.form = this.fb.group({
        'name': [this.userName, [Validators.required,
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

    if(userName) {

      //save user data in local storage
      let userDataInStorage = localStorage.getItem('user_info');

      //check in user not exist
      if (!userDataInStorage) {
        this.addNewUser(userName);

      } else {
        this.updateUser(userDataInStorage);
      }
    }
  }

  /**
   *
   * @param data
   */
  addNewUser(data: string) {

    // GENERATE USER DATA AND SAVE IT
    this.user = Object.assign({}, {
      name : data,
      location : {
        longitude: this.location.longitude,
        latitude: this.location.latitude
      }
    });

    this._projectService.postUser(this.user)
      .subscribe(
        (res) => {
          localStorage.setItem('user_info', JSON.stringify({
            'id': res.id,
            'location': res.location,
            'name': res.name
            })
          );

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
   * @param userDataInStorage
   */
  updateUser(userDataInStorage) {

    let dataInStorage = JSON.parse(userDataInStorage);
    let userId = dataInStorage.id;

    // GENERATE USER DATA AND SAVE IT
    this.user = Object.assign({}, {
      name: this.form.value.name,
      location : {
        longitude: this.location.longitude,
        latitude: this.location.latitude
      },
      updated: new Date()
    });

    this._projectService.putUser(userId, this.user)
      .subscribe(
        (res) => {
          this.updateUserList.emit(res);
          localStorage.setItem('user_info', JSON.stringify({
            id: res.id,
            location: res.location,
            name: res.name
          }))
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

    //Update location at refresh or check-in action
    this.checkUserData();
  }

  // reset form data
  resetFormData() {
    let storageData = localStorage.getItem('user_info');

    if(storageData) {
      storageData = JSON.parse(storageData);
      this.userName = storageData['name'] ? storageData['name'] : '';
    }

    this.initUserForm();
  }
}

