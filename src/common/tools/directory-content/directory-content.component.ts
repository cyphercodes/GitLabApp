import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {DirectoryPage} from "../../../pages/project/directory/directory";
@Component({
  selector: 'directory-content',
  templateUrl: 'directory-content.component.html',
})
export class DirectoryContentComponent {

  @Input() repoTree = [];

  constructor(public navCtrl: NavController) {
  }

  goToDirectory(dir) {
    console.log(dir);
    this.navCtrl.push(DirectoryPage, {dir: dir});
  }

}
