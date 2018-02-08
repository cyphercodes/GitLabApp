import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {IssuesPage} from "./issues";

@NgModule({
  declarations: [
    IssuesPage
  ],
  imports: [
    IonicPageModule.forChild(IssuesPage)
  ],
})
export class IssuesModule {
}
