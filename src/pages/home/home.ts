import {Component} from "@angular/core";
import {LoadingController, NavController} from "ionic-angular";
import {Api} from "../../common/services/Api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public search = '';
  projects = [];
  private page = 1;
  request = null;

  constructor(public navCtrl: NavController, protected loadingCtrl: LoadingController, protected api: Api) {

  }

  ionViewDidLoad() {
    this.doSearch(true);
  }

  onSearch(e) {
    this.doSearch(true);
  }

  onSearchCancel(e) {

  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.doSearch(false, infiniteScroll);
  }

  doSearch(clear = false, infiniteSearch = null) {
    if (clear) {
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
    });
  }


}
