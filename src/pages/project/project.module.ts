import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ProjectPage} from "./project";
import {MomentModule} from "angular2-moment";
import {MembersModule} from "./members/members.module";
import {CommitModule} from "./repository/commits/commit/commit.module";
import {IssuesModule} from "./issues/issues.module";
import {FileModule} from "./repository/file/file.module";
import {DirectoryModule} from "./repository/directory/directory.module";
import {DirectoryContentModule} from "../../common/tools/directory-content/directory-content.module";

@NgModule({
  declarations: [
    ProjectPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ProjectPage),
    FileModule,
    IssuesModule,
    CommitModule,
    MembersModule,
    DirectoryModule,
    DirectoryContentModule
  ],
})
export class ProjectModule {
}
