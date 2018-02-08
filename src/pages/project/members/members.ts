import {Component, ViewChild} from "@angular/core";
import {Api} from "../../../common/services/Api";
import {Project} from "../../../common/services/Project";
import {InfiniteScroll, IonicPage, NavController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  title: string;
  private page = 1;
  public models = [];
  request = null;

  constructor(public api: Api, public project: Project, public nav: NavController) {

  }

  ionViewDidLoad() {
    this.doSearch(true);
  }

  doInfinite(infiniteScroll) {
    if (this.infiniteScroll.enabled) {
      return;
    }
    this.page++;
    this.doSearch(false, infiniteScroll);
  }

  doSearch(clear = false, infiniteSearch = null) {
    if (clear) {
      this.models = [];
      this.page = 1;
      this.infiniteScroll.enable(true);
    }
    if (this.request) {
      this.request.unsubscribe();
    }

    let params = {
      per_page: 15,
      page: this.page,
    };
    this.api.getProjectMembers(this.project.get().id, {
      params: params
    }).subscribe((data) => {
      let models = data.json();
      console.log(models);
      for (let model of models) {
        this.models.push(model);
      }
      if (models.length < 1) {
        this.infiniteScroll.enable(false);
      }
      if (infiniteSearch) {
        infiniteSearch.complete();
      }
    })
  }

  goTo(model) {
    // this.nav.push(CommitPage, {commit: commit});
  }

  access(level) {
    switch (level) {
      case 10:
        return 'Guest';
      case 20:
        return 'Reporter';
      case 30:
        return 'Developer';
      case 40:
        return 'Master';
      case 50:
        return 'Owner';
      default:
        return 'Unknown';
    }

  }
}
