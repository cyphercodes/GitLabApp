import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";

import {MyApp} from "./app.component";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {SideMenuContentComponent} from "../common/tools/side-menu-content/side-menu-content.component";
import {HttpModule} from "@angular/http";
import {Ahttp} from "../common/services/Ahttp";
import {MomentModule} from "angular2-moment";
import {Api} from "../common/services/Api";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Auth} from "../common/services/Auth";
import {IonicStorageModule} from "@ionic/storage";
import {ProjectModule} from "../pages/project/project.module";
import {Project} from "../common/services/Project";
import {RepoTools} from "../common/tools/repo-tools/repo-tools";
import {HomeModule} from "../pages/home/home.module";

@NgModule({
  declarations: [
    MyApp,
    SideMenuContentComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MomentModule,
    IonicStorageModule.forRoot(),
    HomeModule,
    ProjectModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SideMenuContentComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Ahttp,
    Api,
    Auth,
    InAppBrowser,
    Project,
    RepoTools
  ]
})
export class AppModule {
}
