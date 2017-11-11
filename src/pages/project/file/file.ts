import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Project} from "../../../common/services/Project";
import {Api} from "../../../common/services/Api";
import * as hljs from "highlight.js";
import {RepoTools} from "../../../common/tools/repo-tools/repo-tools";

@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {
  file = null;
  remote_file = null;
  content = '';

  constructor(public project: Project, private navParams: NavParams, private api: Api, private repoTools: RepoTools) {
  }

  ionViewDidLoad() {
    this.file = this.navParams.get("file");
    console.log(this.file);
    this.api.getFile(this.project.get().id, this.file.path, {params: {ref: 'master'}}).subscribe((data) => {
      console.log(data.json());
      this.remote_file = data.json();
      this.content = hljs.highlightAuto(this.repoTools.b64DecodeUnicode(this.remote_file.content)).value;
      let tmpContent = '<span class="line">' + this.content;
      tmpContent = tmpContent.replace(/(?:\r\n|\r|\n)/g, '</span> <span class="line">');
      tmpContent = '</span>' + tmpContent;
      this.content = tmpContent;
    }, (err) => {

    })
  }

}
