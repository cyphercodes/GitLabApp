import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {DirectoryPage} from "./directory";
import {DirectoryContentModule} from "../../../../common/tools/directory-content/directory-content.module";

@NgModule({
  declarations: [
    DirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectoryPage),
    DirectoryContentModule
  ],
})
export class DirectoryModule {
}
