import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
  selector: 'directory-content',
  templateUrl: 'directory-content.component.html',
})
export class DirectoryContentComponent {

  @Input() repoTree = [];

  constructor(public navCtrl: NavController) {
  }

  goTo(path) {
    if (path.type == "tree") {
      this.navCtrl.push("DirectoryPage", {dir: path});
    } else {
      this.navCtrl.push("FilePage", {file: path});
    }
  }

}
