import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
import {Project} from "../../../../../common/services/Project";
import {Api} from "../../../../../common/services/Api";
import {Diff2Html} from 'diff2html';
import * as hljs from "highlight.js";

@IonicPage()
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
        console.log(onediff);
        diff = diff + `
diff --git ` + onediff.old_path + ` ` + onediff.new_path + `
` + ((onediff.new_file) ? (`new file mode ` + onediff.b_mode) : (``)) + `
` + ((onediff.deleted_file) ? (`deleted file mode ` + onediff.a_mode) : (``)) + `
--- ` + onediff.old_path + `
+++ ` + onediff.new_path + `
      ` + onediff.diff;
      }
      console.log(diff);
      let outputHtml = Diff2Html.getPrettyHtml(diff, {
        showFiles: true,
        // rawTemplates: {'generic-wrapper': "<div class=\"d2h-wrapme\">{{content}}</div>"}
      });
      this.outputHtmls.push(outputHtml);
      setTimeout(() => {
        var codeLines = document.getElementsByClassName("d2h-code-line-ctn");
        [].forEach.call(codeLines, function (line) {
          hljs.highlightBlock(line);
        });
      }, 5)
    });
  }

}
