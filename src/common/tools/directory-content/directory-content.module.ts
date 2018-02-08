import {NgModule} from "@angular/core";
import {DirectoryContentComponent} from "./directory-content.component";
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [
    DirectoryContentComponent
  ],
  imports: [IonicModule],
  exports: [
    DirectoryContentComponent
  ]
})
export class DirectoryContentModule {
}
