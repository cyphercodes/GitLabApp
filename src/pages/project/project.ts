import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {Project} from "../../common/services/Project";
import {Api} from "../../common/services/Api";


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  title: string;
  repoEmpty = false;
  repoTree = [];

  constructor(public navCtrl: NavController, public project: Project, private api: Api) {
  }

  ionViewDidLoad() {
    this.api.getRepoTree(this.project.get().id).subscribe((data) => {
      console.log(data.json());
      this.repoTree = data.json();
    }, (err) => {
      if (err.status === 404) {
        this.repoEmpty = true;
      }
    })
  }

}
