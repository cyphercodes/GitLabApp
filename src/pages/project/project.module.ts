import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ProjectPage} from "./project";
import {DirectoryContentComponent} from "../../common/tools/directory-content/directory-content.component";
import {DirectoryPage} from "./directory/directory";

@NgModule({
  declarations: [
    ProjectPage,
    DirectoryPage,
    DirectoryContentComponent
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    IonicPageModule.forChild(DirectoryPage),
  ],
})
export class ProjectModule {
}
