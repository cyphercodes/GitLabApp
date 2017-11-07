import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {DirectoryPage} from "../../../pages/project/directory/directory";
import {FilePage} from "../../../pages/project/file/file";
@Component({
  selector: 'directory-content',
  templateUrl: 'directory-content.component.html',
})
export class DirectoryContentComponent {

  @Input() repoTree = [];

  constructor(public navCtrl: NavController) {
  }

  goTo(path) {
    console.log(path);
    if (path.type == "tree") {
      this.navCtrl.push(DirectoryPage, {dir: path});
    } else {
      this.navCtrl.push(FilePage, {file: path});
    }
  }

}
