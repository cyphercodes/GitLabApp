import {Injectable} from "@angular/core";
import {Ahttp} from "./Ahttp";

@Injectable()
export class Api {
  url: string = "https://gitlab.com/api/v4";

  constructor(private http: Ahttp) {
  }

  getProjects(options) {
    return this.http.get(this.url + '/projects', options);
  }

}