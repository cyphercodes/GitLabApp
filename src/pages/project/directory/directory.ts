import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Project} from "../../../common/services/Project";
import {Api} from "../../../common/services/Api";
import * as mdit from "markdown-it";
import * as mditHighlightjs from "markdown-it-highlightjs";

@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  title: string;
  repoEmpty = false;
  repoTree = [];
  readme = null;
  rmfile = null;
  repoDir;

  constructor(public project: Project, private api: Api, private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.repoDir = this.navParams.get("dir");
    console.log(this.repoDir);
    this.title = this.repoDir.path;

    let md = new mdit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(mditHighlightjs);

    this.api.getRepoTree(this.project.get().id, {
      params: {
        path: this.repoDir.path
      }
    }).subscribe((data) => {
      console.log(data.json());
      this.repoTree = data.json();
      this.api.getReadme(this.project.get().id, this.repoDir.path, {
        params: {ref: 'master'}
      }).subscribe((data) => {
        this.rmfile = data.json();
        this.readme = md.render(atob(this.rmfile.content));
      }, err => {
        console.log(err);
      });
    }, (err) => {
      if (err.status === 404) {
        this.repoEmpty = true;
      }
    })
  }

}
