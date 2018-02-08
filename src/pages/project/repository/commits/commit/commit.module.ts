import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CommitPage} from "./commit";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    CommitPage
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(CommitPage)
  ],
})
export class CommitModule {
}
