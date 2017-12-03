import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {Project} from "../../common/services/Project";
import {Api} from "../../common/services/Api";
import * as mdit from "markdown-it";
import * as mditHighlightjs from "markdown-it-highlightjs";
import {RepoTools} from "../../common/tools/repo-tools/repo-tools";


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
  proj = null;

  constructor(public project: Project, private api: Api, private repoTools: RepoTools) {
  }

  ionViewDidLoad() {
    console.log(this.project.get());
    this.proj = this.project.get();
    let md = new mdit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(mditHighlightjs);
    this.api.getRepoTree(this.project.get().id).subscribe((data) => {
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
