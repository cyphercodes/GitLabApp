import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Project} from "../../../../common/services/Project";
import {Api} from "../../../../common/services/Api";
import {RepoTools} from "../../../../common/tools/repo-tools/repo-tools";

@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {
  file = null;
  remote_file = null;
  content: any = '';
  type = null;

  constructor(public project: Project, private navParams: NavParams, private api: Api, private repoTools: RepoTools) {
  }

  ionViewDidLoad() {
    this.file = this.navParams.get("file");
    console.log(this.file);
    this.api.getFile(this.project.get().id, this.file.path, {params: {ref: 'master'}}).subscribe((data) => {
      this.remote_file = data.json();
      if (this.repoTools.is_image(this.remote_file.file_name)) {
        this.type = 'img';
        this.content = this.repoTools.build_img_src(this.remote_file);
      } else {
        this.type = 'file';
        this.content = this.repoTools.fix_file_content(this.remote_file.content);
      }
    }, (err) => {

    })
  }

}
