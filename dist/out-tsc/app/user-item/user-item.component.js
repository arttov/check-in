var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var UserItemComponent = (function () {
    function UserItemComponent() {
    }
    UserItemComponent.prototype.ngOnInit = function () {
        this.generateUpdatedTime();
        this.convertDistance();
    };
    // convert users distance
    UserItemComponent.prototype.convertDistance = function () {
        var decimalZero = this.user.dis.toString()[0], dist = this.user.dis;
        if (decimalZero == '0') {
            this.distance = Number(Math.round(dist + 1) + 'e-' + 1);
        }
        else {
            this.distance = dist;
        }
        this.distance = this.distance.toFixed(1);
    };
    /**
     * This function is used to generate last updated time for user list
     */
    UserItemComponent.prototype.generateUpdatedTime = function () {
        //generate last updated time ago for each user in list
        var dateString = this.user.obj.updated, newDate = new Date(dateString);
        //get different date by day
        var currentDate = new Date();
        this.diffDate = currentDate.getDate() - newDate.getDate();
        this.dateText = 'days';
        //check date status
        if (this.diffDate < 1) {
            this.diffDate = currentDate.getHours() - newDate.getHours();
            this.dateText = 'hours';
        }
        if (this.diffDate < 1) {
            this.diffDate = currentDate.getMinutes() - newDate.getMinutes();
            this.dateText = 'minutes';
        }
        if (this.diffDate < 1) {
            this.diffDate = currentDate.getSeconds() - newDate.getSeconds();
            this.dateText = 'seconds';
        }
    };
    return UserItemComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], UserItemComponent.prototype, "user", void 0);
UserItemComponent = __decorate([
    Component({
        selector: 'app-user-item',
        templateUrl: './user-item.component.html',
        styleUrls: ['./user-item.component.css']
    }),
    __metadata("design:paramtypes", [])
], UserItemComponent);
export { UserItemComponent };
//# sourceMappingURL=/var/www/html/check-in/src/app/user-item/user-item.component.js.map