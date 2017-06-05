var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
var HomepageComponent = (function () {
    function HomepageComponent(_projectService) {
        this._projectService = _projectService;
    }
    HomepageComponent.prototype.ngOnInit = function () { };
    /**
     * This function is used to get all user ind DB
     */
    HomepageComponent.prototype.getAllUser = function (data) {
        var _this = this;
        this._projectService.getAllUser(data)
            .subscribe(function (res) {
            _this.users = res;
        }, function (error) {
            if (error._body) {
                _this.errorMessage = JSON.parse(error._body);
            }
        });
    };
    /**
     * Function for emitter new user name data
     *
     * @param data
     */
    HomepageComponent.prototype.updateUserList = function (data) {
        this.getAllUser(data);
    };
    return HomepageComponent;
}());
HomepageComponent = __decorate([
    Component({
        selector: 'app-homepage',
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css']
    }),
    __metadata("design:paramtypes", [ProjectService])
], HomepageComponent);
export { HomepageComponent };
//# sourceMappingURL=/var/www/html/check-in/src/app/homepage/homepage.component.js.map