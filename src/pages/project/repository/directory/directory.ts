import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
import {Project} from "../../../../common/services/Project";
import {Api} from "../../../../common/services/Api";
import * as mdit from "markdown-it";
import * as mditHighlightjs from "markdown-it-highlightjs";
import {RepoTools} from "../../../../common/tools/repo-tools/repo-tools";

@IonicPage()
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
  path = null;

  constructor(public project: Project, private api: Api, private navParams: NavParams, private repoTools: RepoTools) {
  }

  ionViewDidLoad() {
    this.repoDir = this.navParams.get("dir");
    console.log(this.repoDir);
    if (this.repoDir) {
      this.title = this.repoDir.path;
      this.path = this.repoDir.path;
    } else {
      this.path = '/'
    }

    let md = new mdit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(mditHighlightjs);

    this.api.getRepoTree(this.project.get().id, {
      params: {
        path: this.path
      }
    }).subscribe((data) => {
      console.log(data.json());
      this.repoTree = data.json();
      let readmeFile;
      if (readmeFile = this.repoTools.find_readme(this.repoTree)) {
        this.api.getFile(this.project.get().id, readmeFile.path, {
          params: {ref: 'master'}
        }).subscribe((data) => {
          this.rmfile = data.json();
          let fileContent = this.repoTools.process_md_content(this.rmfile.content, this.project.get().web_url);
          this.readme = md.render(fileContent);
        }, err => {
          console.log(err);
        });
      }
    }, (err) => {
      if (err.status === 404) {
        this.repoEmpty = true;
      }
    })
  }

}
