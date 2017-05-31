import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import {User} from "./interface/user";

@Injectable()
export class ProjectService {

  // TODO
  private baseOrigin = environment.production ? 'http://stage.bucketlist127.com' : 'http://' + window.location.hostname + ':3000';
  private headers = new Headers();

  private baseUrl = this.baseOrigin;
  private userUrl  = this.baseUrl + '/api/users';

  constructor(private http: Http, private router: Router) {

    console.log(this.userUrl);
    if (!environment.production) {
      console.log('you are in development mode');
    }
  }

  /**
   * @param data
   * @returns {Observable<R|T>}
   */
  postUser(data: User): Observable<any> {
    return this.http.post(this.userUrl, data, {headers: this.headers})
      .map((r: Response) => r.json())
      .catch(this.handleError);
  }

  /**
   *
   * @returns {Observable<R|T>}
   */
  getAllUser(): Observable<any> {
    return this.http.get(this.userUrl)
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
