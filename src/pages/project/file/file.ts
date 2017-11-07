import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Project} from "../../../common/services/Project";
import {Api} from "../../../common/services/Api";
import * as hljs from 'highlight.js';

@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {
  @ViewChild('code') codeElement: ElementRef;
  file = null;
  remote_file = null;
  content = '';

  constructor(public project: Project, private navParams: NavParams, private api: Api) {
  }

  ionViewDidLoad() {
    this.file = this.navParams.get("file");
    console.log(this.file);
    this.api.getFile(this.project.get().id, this.file.path, {params: {ref: 'master'}}).subscribe((data) => {
      console.log(data.json());
      this.remote_file = data.json();
      this.content = atob(this.remote_file.content);
      setTimeout(() => {
        hljs.highlightBlock(this.codeElement.nativeElement);
      }, 1)
    }, (err) => {

    })
  }

}
