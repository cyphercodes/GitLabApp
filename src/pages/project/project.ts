import {Component, ViewChild} from "@angular/core";
import {IonicPage, Navbar, NavController} from "ionic-angular";
import {Project} from "../../common/services/Project";
import {Api} from "../../common/services/Api";
import * as mdit from "markdown-it";
import * as mditHighlightjs from "markdown-it-highlightjs";


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  @ViewChild(Navbar) navBar: Navbar;

  title: string;
  repoEmpty = false;
  repoTree = [];
  readme = null;
  rmfile = null;

  constructor(public navCtrl: NavController, public project: Project, private api: Api) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.project.clear();
      this.navCtrl.pop();
    }
    let md = new mdit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(mditHighlightjs);
    console.log(md);
    this.api.getRepoTree(this.project.get().id).subscribe((data) => {
      console.log(data.json());
      this.repoTree = data.json();
      this.api.getReadme(this.project.get().id, null, {
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
