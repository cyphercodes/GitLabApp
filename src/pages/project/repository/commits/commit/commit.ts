import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Project} from "../../../../../common/services/Project";
import {Api} from "../../../../../common/services/Api";
import {Diff2Html} from 'diff2html'

@Component({
  selector: 'page-commit',
  templateUrl: 'commit.html',
})
export class CommitPage {
  commit = null;
  diffs = null;
  outputHtmls = [];

  constructor(public project: Project, private navParams: NavParams, private api: Api) {
  }

  ionViewDidLoad() {
    this.commit = this.navParams.get("commit");
    console.log(this.commit);
    this.api.getCommitDiff(this.project.get().id, this.commit.id).subscribe((data) => {
      this.diffs = data.json();
      let diff = '';
      for (let onediff of this.diffs) {
        diff = diff + `
diff --git ` + onediff.old_path + ` ` + onediff.new_path + `
` + ((onediff.new_file) ? (`new file mode ` + onediff.b_mode) : (``)) + `
--- ` + onediff.old_path + `
+++ ` + onediff.new_path + `
      ` + onediff.diff;
      }
      let outputHtml = Diff2Html.getPrettyHtml(diff, {
        // showFiles: true,
      });
      this.outputHtmls.push(outputHtml);

    });
  }

}
