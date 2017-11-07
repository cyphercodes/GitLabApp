import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ProjectPage} from "./project";
import {DirectoryContentComponent} from "../../common/tools/directory-content/directory-content.component";
import {DirectoryPage} from "./directory/directory";
import {FilePage} from "./file/file";

@NgModule({
  declarations: [
    ProjectPage,
    DirectoryPage,
    DirectoryContentComponent,
    FilePage
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    IonicPageModule.forChild(DirectoryPage),
    IonicPageModule.forChild(FilePage)
  ],
})
export class ProjectModule {
}
