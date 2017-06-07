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

  //default data for google map
  zoom = 17;
  coordinate: number[] =
    [
      45.245175,
      40.514692
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

    //init form with validation
    this.form = this.fb.group({
        'name': [this.userName, [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
          ValidationService.userNameValidator]]
      }
    );
  }

  /**
   * This function is used to send user name with form
   */
  sendUserData() {
    if (this.form.value.name) {
      this.initCurrentCoordinate();
    }
  }

  /**
   * This function is used to manage user data
   */
  checkUserData() {

    //get user name in form
    let userName = this.form.value.name;

    if(userName) {

      //save user data in local storage
      let userDataInStorage = localStorage.getItem('user_info');

      //check if user not exist in storage
      if (!userDataInStorage) {
        this.addNewUser(userName);

      } else {
        this.updateUser(userDataInStorage);
      }
    }
  }

  /**
   * This function is used to add new user coordinate in db
   *
   * @param data
   */
  addNewUser(data: string) {

    //GENERATE USER DATA AND SAVE IT
    this.user = Object.assign({}, {
      name : data,
      coordinate : this.coordinate
      // coordinate : [44.498005, 40.197218]
      //40.197218, 44.498005
    });

    this._projectService.postUser(this.user)
      .subscribe(
        (res) => {
          if(res) {

            //send emitter for update user list
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
   * This function is used to update user data
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

            //send emitter for update user list
            this.updateUserList.emit(res.coordinate);
            localStorage.setItem('user_info', JSON.stringify({
              id: res.id,
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

  //get current coordinate in service and save it
  onLocationChange(showPosition) {

    //set current coordinate in variables
    let coordinate = [];
    coordinate.push(Number.parseFloat(showPosition.coords.longitude.toFixed(6)));
    coordinate.push(Number.parseFloat(showPosition.coords.latitude.toFixed(6)));
    this.coordinate = coordinate;

    if(this.getLocation) {
      //manage user coordinate
      this.checkUserData();
    } else{

      //send emitter for update user list
      this.updateUserList.emit(this.coordinate);
    }
  }

  //open form function
  openForm() {

    //get user data in local storage
    let storageData = localStorage.getItem('user_info');

    //set user name in form if it exist in storage
    if(storageData) {
      storageData = JSON.parse(storageData);
      this.userName = storageData['name'] ? storageData['name'] : '';
    }

    this.initUserForm();
  }
}

