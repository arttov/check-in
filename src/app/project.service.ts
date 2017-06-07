import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import {User} from "./interface/user";

@Injectable()
export class ProjectService {

  private baseOrigin = environment.host;
  private headers = new Headers();

  private baseUrl = this.baseOrigin;
  private userUrl  = this.baseUrl + '/api/users';

  constructor(private http: Http, private router: Router) {}

  /**
   * This function is used to create user with coordinate
   *
   * @param data
   * @returns {Observable<R|T>}
   */
  postUser(data: User): Observable<any> {
    return this.http.post(this.userUrl, data, {headers: this.headers})
      .map((r: Response) => r.json())
      .catch(this.handleError);
  }

  /**
   * This function is used to update user with coordinate
   *
   * @param userId
   * @param data
   * @returns {Observable<R|T>}
   */
  putUser(userId: number, data: User): Observable<any> {
    return this.http.put(this.userUrl + '/' + userId, data, {headers: this.headers})
      .map((r: Response) => r.json())
      .catch(this.handleError);
  }

  /**
   * This function is used to get current location for user
   */
  getLocation(successCb) {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        successCb,
        (err) => {
          console.log(err);
        });
    } else {
      console.log('Your browser don\`t support HTML5');
    }
  }

  /**
   *
   * @returns {Observable<R|T>}
   */
  getAllUser(data: any): Observable<any> {
    return this.http.get(this.userUrl+'/'+data[0]+'/'+data[1])
      .map((r: Response) => r.json())
      .catch(this.handleError);
  }

  /**
   *
   * @param error
   * @returns {ErrorObservable}
   */
  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead

    if (error.status && error.status === 401) {
      this.router.navigate(['/']);
    }

    return Observable.throw(errMsg);
  }

}
