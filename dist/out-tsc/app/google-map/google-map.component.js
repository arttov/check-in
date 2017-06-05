var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';
import { ValidationService } from '../validation.service';
import { FormBuilder, Validators } from "@angular/forms";
var GoogleMapComponent = (function () {
    function GoogleMapComponent(fb, _projectService) {
        this.fb = fb;
        this._projectService = _projectService;
        this.updateUserList = new EventEmitter();
        this.userName = '';
        this.getLocation = false;
        //default data for map
        this.zoom = 17;
        this.coordinate = [
            -0.3824905,
            51.5287336
        ];
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        this.errorMessage = null;
        this.initUserForm();
        this._projectService.getLocation(this.onLocationChange.bind(this));
    };
    /**
     * This function is used to init form
     */
    GoogleMapComponent.prototype.initUserForm = function () {
        // create form validation
        this.form = this.fb.group({
            'name': [this.userName, [Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(2),
                    ValidationService.userNameValidator]]
        });
    };
    /**
     * This function is used to save user data in db
     */
    GoogleMapComponent.prototype.sendUserData = function () {
        if (this.form.value.name) {
            this.initCurrentCoordinate();
        }
    };
    /**
     * This function is used to check for saving user data nad coordinate
     */
    GoogleMapComponent.prototype.checkUserData = function () {
        //get user name in form
        var userName = this.form.value.name;
        if (userName) {
            //save user data in local storage
            var userDataInStorage = localStorage.getItem('user_info');
            //check in user not exist
            if (!userDataInStorage) {
                this.addNewUser(userName);
            }
            else {
                this.updateUser(userDataInStorage);
            }
        }
    };
    /**
     *
     * @param data
     */
    GoogleMapComponent.prototype.addNewUser = function (data) {
        var _this = this;
        // GENERATE USER DATA AND SAVE IT
        this.user = Object.assign({}, {
            name: data,
            coordinate: this.coordinate
            // coordinate : [44.548339, 40.230122]
            //40.230122, 44.548339
        });
        this._projectService.postUser(this.user)
            .subscribe(function (res) {
            if (res) {
                _this.updateUserList.emit(res.coordinate);
                _this.errorMessage = null;
                localStorage.setItem('user_info', JSON.stringify({
                    'id': res.id,
                    'coordinate': res.coordinate,
                    'name': res.name
                }));
            }
        }, function (error) {
            _this.errorMessage = JSON.parse(error._body);
        });
    };
    /**
     *
     * @param userDataInStorage
     */
    GoogleMapComponent.prototype.updateUser = function (userDataInStorage) {
        var _this = this;
        var dataInStorage = JSON.parse(userDataInStorage);
        var userId = dataInStorage.id;
        // GENERATE USER DATA AND SAVE IT
        this.user = Object.assign({}, {
            name: this.form.value.name,
            coordinate: this.coordinate,
            updated: new Date()
        });
        this._projectService.putUser(userId, this.user)
            .subscribe(function (res) {
            if (res) {
                _this.updateUserList.emit(res.coordinate);
                localStorage.setItem('user_info', JSON.stringify({
                    id: res.id,
                    coordinate: res.coordinate,
                    name: res.name
                }));
            }
        }, function (error) {
            _this.errorMessage = JSON.parse(error._body);
        });
    };
    /**
     * This function is used to init current coordinate
     */
    GoogleMapComponent.prototype.initCurrentCoordinate = function () {
        this.getLocation = true;
        this._projectService.getLocation(this.onLocationChange.bind(this));
    };
    // get current coordinate in service and save it
    GoogleMapComponent.prototype.onLocationChange = function (showPosition) {
        var coordinate = [];
        coordinate.push(Number.parseFloat(showPosition.coords.longitude.toFixed(5)));
        coordinate.push(Number.parseFloat(showPosition.coords.latitude.toFixed(5)));
        this.coordinate = coordinate;
        if (this.getLocation) {
            //Update coordinate
            this.checkUserData();
        }
        else {
            this.updateUserList.emit(this.coordinate);
        }
    };
    // reset form data
    GoogleMapComponent.prototype.resetFormData = function () {
        var storageData = localStorage.getItem('user_info');
        if (storageData) {
            storageData = JSON.parse(storageData);
            this.userName = storageData['name'] ? storageData['name'] : '';
        }
        this.initUserForm();
    };
    return GoogleMapComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], GoogleMapComponent.prototype, "updateUserList", void 0);
GoogleMapComponent = __decorate([
    Component({
        selector: 'app-google-map',
        templateUrl: './google-map.component.html',
        styleUrls: ['./google-map.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder, ProjectService])
], GoogleMapComponent);
export { GoogleMapComponent };
//# sourceMappingURL=/var/www/html/check-in/src/app/google-map/google-map.component.js.map