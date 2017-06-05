var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
var ProjectService = (function () {
    function ProjectService(http, router) {
        this.http = http;
        this.router = router;
        this.baseOrigin = environment.host;
        this.headers = new Headers();
        this.baseUrl = this.baseOrigin;
        this.userUrl = this.baseUrl + '/api/users';
        if (!environment.production) {
            console.log('you are in development mode');
        }
    }
    /**
     * @param data
     * @returns {Observable<R|T>}
     */
    ProjectService.prototype.postUser = function (data) {
        return this.http.post(this.userUrl, data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     * @param userId
     * @param data
     * @returns {Observable<R|T>}
     */
    ProjectService.prototype.putUser = function (userId, data) {
        return this.http.put(this.userUrl + '/' + userId, data, { headers: this.headers })
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     * This function is used to get current location for user
     */
    ProjectService.prototype.getLocation = function (successCb) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCb, function (err) {
                console.log(err);
            });
        }
        else {
            console.log('Your browser don\`t support HTML5');
        }
    };
    /**
     *
     * @returns {Observable<R|T>}
     */
    ProjectService.prototype.getAllUser = function (data) {
        return this.http.get(this.userUrl + '/' + data[0] + '/' + data[1])
            .map(function (r) { return r.json(); })
            .catch(this.handleError);
    };
    /**
     *
     * @param error
     * @returns {ErrorObservable}
     */
    ProjectService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        if (error.status && error.status === 401) {
            this.router.navigate(['/']);
        }
        return Observable.throw(errMsg);
    };
    return ProjectService;
}());
ProjectService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Router])
], ProjectService);
export { ProjectService };
//# sourceMappingURL=/var/www/html/check-in/src/app/project.service.js.map