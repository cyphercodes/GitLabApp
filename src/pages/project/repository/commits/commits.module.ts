import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CommitsPage} from "./commits";
import {CommitModule} from "./commit/commit.module";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    CommitsPage
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(CommitsPage),
    CommitModule
  ],
})
export class CommitsModule {
}
