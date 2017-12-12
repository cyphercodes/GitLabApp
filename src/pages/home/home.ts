import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, NavController, Searchbar} from "ionic-angular";
import {Api} from "../../common/services/Api";
import {Auth} from "../../common/services/Auth";
import {Project} from "../../common/services/Project";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('searchbar') searchBar: Searchbar;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  public search = '';
  projects = [];
  private page = 1;
  request = null;
  spin = false;
  showSearchBar = false;

  constructor(public navCtrl: NavController, public api: Api, public auth: Auth, public project: Project) {
  }

  ionViewDidEnter() {
    this.project.clear();
  }

  ionViewDidLoad() {
    this.doSearch(true);
  }

  onSearch(e) {
    if (this.search.length == 0) {
      this.showSearchBar = false;
    }
    this.doSearch(true);
  }

  onSearchCancel(e) {
    this.showSearchBar = false;
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
      this.spin = true;
      this.projects = [];
      this.page = 1;
      this.infiniteScroll.enable(true);
    }
    if (this.request) {
      this.request.unsubscribe();
    }
    let params = {
      search: this.search.length > 0 ? this.search : '',
      per_page: 10,
      page: this.page,
    };
    if (this.auth.isLoggedIn && this.search.length < 1) {
      // params['owned'] = true;
      params['membership'] = true;
      // params['starred'] = true;

    }
    this.request = this.api.getProjects({
      params: params
    }).subscribe(data => {
      let projs = data.json();
      for (let proj of projs) {
        this.projects.push(proj);
      }
      if (projs.length < 1) {
        this.infiniteScroll.enable(false);
      }
      if (infiniteSearch) {
        infiniteSearch.complete();
      }
      this.spin = false;
    }, err => {
      this.spin = false;
    });
  }

  showSearch() {
    this.showSearchBar = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150)
  }

  goToProject(project) {
    this.project.set(project);
  }
}
