import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ProjectPage} from "./project";
import {DirectoryContentComponent} from "../../common/tools/directory-content/directory-content.component";
import {DirectoryPage} from "./repository/directory/directory";
import {FilePage} from "./repository/file/file";
import {IssuesPage} from "./issues/issues";
import {CommitsPage} from "./repository/commits/commits";
import {MomentModule} from "angular2-moment";
import {CommitPage} from "./repository/commits/commit/commit";
import {MembersPage} from "./members/members";

@NgModule({
  declarations: [
    ProjectPage,
    DirectoryPage,
    DirectoryContentComponent,
    FilePage,
    IssuesPage,
    CommitsPage,
    CommitPage,
    MembersPage
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ProjectPage),
    IonicPageModule.forChild(DirectoryPage),
    IonicPageModule.forChild(FilePage),
    IonicPageModule.forChild(IssuesPage),
    IonicPageModule.forChild(CommitsPage),
    IonicPageModule.forChild(CommitPage),
    IonicPageModule.forChild(MembersPage)
  ],
})
export class ProjectModule {
}
