import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Auth} from "./Auth";
import swal from "sweetalert2";

@Injectable()
export class Ahttp {

  constructor(private http: Http, private auth: Auth) {
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (this.auth.isLoggedIn) {
      if (!options.headers) {
        options.headers = new Headers();
      }
      options.headers.append('Authorization', 'Bearer ' + this.auth.token);
    }

    return this.http.get(url, options).catch((error: any) => {
      if (error.status === 422 || error.status === 403 || error.status === 401) {
        swal(error.statusText, error.json().message, 'error');
      }
      return Observable.throw(error);
    });

  }

}
