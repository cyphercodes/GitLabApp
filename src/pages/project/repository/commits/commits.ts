import {Component, ViewChild} from "@angular/core";
import {Api} from "../../../../common/services/Api";
import {Project} from "../../../../common/services/Project";
import {InfiniteScroll, NavController} from "ionic-angular";
import {CommitPage} from "./commit/commit";

@Component({
  selector: 'page-commits',
  templateUrl: 'commits.html',
})
export class CommitsPage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  title: string;
  private page = 1;
  public commits = [];
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
      this.commits = [];
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
    this.api.getCommits(this.project.get().id, {
      params: params
    }).subscribe((data) => {
      let commits = data.json();
      for (let commit of commits) {
        this.commits.push(commit);
      }
      if (commits.length < 1) {
        this.infiniteScroll.enable(false);
      }
      if (infiniteSearch) {
        infiniteSearch.complete();
      }
    })
  }

  goToCommit(commit) {
    this.nav.push(CommitPage, {commit: commit});
  }
}
