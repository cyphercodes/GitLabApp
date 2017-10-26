import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {Project} from "../../common/services/Project";
import {Api} from "../../common/services/Api";
import * as mdit from 'markdown-it';


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  title: string;
  repoEmpty = false;
  repoTree = [];
  readme = null;
  rmfile = null;

  constructor(public navCtrl: NavController, public project: Project, private api: Api) {
  }

  ionViewDidLoad() {
    let md = new mdit();
    console.log(md);
    this.api.getRepoTree(this.project.get().id).subscribe((data) => {
      console.log(data.json());
      this.repoTree = data.json();
      this.api.getReadme(this.project.get().id, {
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
