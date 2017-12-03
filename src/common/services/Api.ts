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

  getFile(id, path, options = {}) {
    path = encodeURIComponent(path);
    return this.http.get(this.url + '/projects/' + id + '/repository/files/' + path, options);
  }

  getCommits(id, options = {}) {
    return this.http.get(this.url + '/projects/' + id + '/repository/commits', options);
  }

  getCommitDiff(id, sha, options = {}) {
    return this.http.get(this.url + '/projects/' + id + '/repository/commits/' + sha + '/diff', options);
  }

}
