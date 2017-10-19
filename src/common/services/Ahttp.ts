import {Injectable} from "@angular/core";
import {Http, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Rx";
// import swal from "sweetalert2";

@Injectable()
export class Ahttp {

  constructor(private http: Http) {
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (options === null || options === undefined) {
      options = new RequestOptions();
    }

    // if (this.auth.isLoggedIn) {
    //   options.headers.append('Authorization', 'Bearer ' + this.auth.token);
    // }


    return this.http.get(url, options).catch((error: any) => {
      if (error.status === 422 || error.status === 403) {
        // const err = error.json();
        // let errMsg = null;
        // if (err.message) {
        //   errMsg = err.message;
        // } else if (err instanceof Array && err[0].message) {
        //   errMsg = err[0].message;
        // } else if (err.error) {
        //   errMsg = err.error;
        // } else {
        //   if (err[Object.keys(err)[0]][0]) {
        //     errMsg = err[Object.keys(err)[0]][0];
        //   }
        // }
        // swal('Oops', errMsg, 'error');
      }
      return Observable.throw(error.json());
    });

  }

}
