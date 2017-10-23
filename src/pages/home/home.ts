import {Component, ViewChild} from "@angular/core";
import {NavController, Searchbar} from "ionic-angular";
import {Api} from "../../common/services/Api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('searchbar') searchbar: Searchbar;

  public search = '';
  projects = [];
  private page = 1;
  request = null;
  spin = false;
  showSearchBar = false;

  constructor(public navCtrl: NavController, protected api: Api) {

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
    this.page++;
    this.doSearch(false, infiniteScroll);
  }

  doSearch(clear = false, infiniteSearch = null) {
    if (clear) {
      this.spin = true;
      this.projects = [];
      this.page = 0;
    }
    if (this.request) {
      this.request.unsubscribe();
    }
    this.request = this.api.getProjects({
      params: {
        search: this.search.length > 0 ? this.search : '',
        per_page: 10,
        page: this.page,
      }
    }).subscribe(data => {
      let projs = data.json();
      for (let proj of projs) {
        this.projects.push(proj);
      }
      if (infiniteSearch) {
        infiniteSearch.complete();
      }
      this.spin = false;
    });
  }

  showSearch() {
    this.showSearchBar = true;
    this.searchbar.setFocus();
  }


}
