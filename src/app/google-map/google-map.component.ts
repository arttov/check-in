import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';
import { ValidationService } from '../validation.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {

  @Output() updateUserList: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  user: any;
  errorMessage: any;
  userName: string = '';
  getLocation: boolean = false;

  //default data for map
  zoom = 17;
  coordinate: number[] = [
    -0.3824905,
    51.5287336
    ];

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
      this.initCurrentCoordinate();
    }
  }

  /**
   * This function is used to check for saving user data nad coordinate
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
      coordinate : this.coordinate
      // coordinate : [41.610836, 41.606056]
      // 41.606056, 41.610836
    });

    this._projectService.postUser(this.user)
      .subscribe(
        (res) => {
          if(res) {
            this.updateUserList.emit(res.coordinate);
            this.errorMessage = null;
            localStorage.setItem('user_info', JSON.stringify({
                'id': res.id,
                'coordinate': res.coordinate,
                'name': res.name
              })
            );
          }
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
      coordinate : this.coordinate,
      updated: new Date()
    });

    this._projectService.putUser(userId, this.user)
      .subscribe(
        (res) => {
          if(res) {
            this.updateUserList.emit(res.coordinate);
            localStorage.setItem('user_info', JSON.stringify({
              id: res.id,
              coordinate: res.coordinate,
              name: res.name
            }))
          }
        },
        error => {
          this.errorMessage = JSON.parse(error._body);
        }
      );
  }

  /**
   * This function is used to init current coordinate
   */
  initCurrentCoordinate() {
    this.getLocation = true;
    this._projectService.getLocation(this.onLocationChange.bind(this));
  }

  // get current coordinate in service and save it
  onLocationChange(showPosition) {

    let coordinate = [];
    coordinate.push(Number.parseFloat(showPosition.coords.longitude.toFixed(5)));
    coordinate.push(Number.parseFloat(showPosition.coords.latitude.toFixed(5)));
    this.coordinate = coordinate;


    if(this.getLocation) {
      //Update coordinate
      this.checkUserData();
    } else{

      this.updateUserList.emit(this.coordinate);
    }
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

