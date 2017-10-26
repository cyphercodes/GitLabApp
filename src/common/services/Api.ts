import {Injectable} from "@angular/core";
import {Ahttp} from "./Ahttp";

@Injectable()
export class Api {
  url: string = "https://gitlab.com/api/v4";

  constructor(private http: Ahttp) {
  }

  getProjects(options = {}) {
    return this.http.get(this.url + '/projects', options);
  }

  getRepoTree(id, options = {}) {
    return this.http.get(this.url + '/projects/' + id + '/repository/tree', options);
  }

  getReadme(id, options = {}) {
    const readme = encodeURIComponent('README.md');
    return this.http.get(this.url + '/projects/' + id + '/repository/files/' + readme, options);
  }

}
