import {Component, ViewChild} from "@angular/core";
import {MenuController, Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {HomePage} from "../pages/home/home";
import {
  MenuOptionModel,
  SideMenuContentComponent,
  SideMenuSettings
} from "../common/tools/side-menu-content/side-menu-content.component";
import {Auth} from "../common/services/Auth";
import {Storage} from "@ionic/storage";
import swal from "sweetalert2";
import {Project} from "../common/services/Project";
import {ProjectPage} from "../pages/project/project";
import {IssuesPage} from "../pages/project/issues/issues";
import {DirectoryPage} from "../pages/project/repository/directory/directory";
import {CommitsPage} from "../pages/project/repository/commits/commits";
import {MembersPage} from "../pages/project/members/members";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  public rootPage: any = HomePage;

  public options: Array<MenuOptionModel> = [];

  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menuCtrl: MenuController, private auth: Auth, private storage: Storage, private project: Project) {
    this.initializeApp();
  }

  initializeApp() {
    let firstTime = true;
    this.auth.authChanged.subscribe((data) => {
      console.log("auth has changed!");
      if (data.isLoggedIn) {
        this.initializeOptions();
        if (!firstTime) {
          swal('Welcome!', 'You have logged in successfully!', 'success');
        }
        firstTime = false;
      } else {
        this.options = [];
      }
      firstTime = false;
      this.nav.setRoot(HomePage);
    });
    this.storage.get('token').then((token) => {
      if (token && token != '') {
        this.auth.login(token);
      } else {
        this.auth.logout();
      }
    });
    this.project.changed.subscribe((data) => {
      if (this.project.has()) {
        this.nav.push(ProjectPage);
      } else {
        // this.nav.setRoot(HomePage);
      }
      this.initializeOptions();
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private initializeOptions(): void {
    this.options = new Array<MenuOptionModel>();
    if (!this.project.has()) {
      this.options.push({
        iconName: 'home',
        displayName: 'Home',
        component: HomePage,
      });
    } else {
      this.options.push({
        iconName: 'home',
        displayName: 'Overview',
        component: ProjectPage,
      });
      this.options.push({
        // iconName: 'copy',
        displayName: 'Repository',
        subItems: [
          {
            displayName: 'Files',
            iconName: 'copy',
            component: DirectoryPage
          },
          {
            displayName: 'Commits',
            iconName: 'git-commit',
            component: CommitsPage
          },
        ]
      });
      this.options.push({
        iconName: 'paper',
        displayName: 'Issues',
        component: IssuesPage,
      });
      this.options.push({
        iconName: 'git-pull-request',
        displayName: 'Merge Requests',
        component: ProjectPage,
      });
      this.options.push({
        iconName: 'people',
        displayName: 'Members',
        component: MembersPage,
      });
    }

    if (!this.project.has()) {
      this.options.push({
        iconName: 'unlock',
        displayName: 'Logout',
        custom: {
          isLogout: true
        }
      });
    }
  }

  public selectOption(option: MenuOptionModel): void {
    this.menuCtrl.close().then(() => {
      if (option.custom && option.custom.isLogout) {
        this.auth.logout();
      } else {
        this.project.canClearProject = false;
        this.nav.popToRoot({animate: false}).then(() => {
          this.project.canClearProject = true;
        });
        this.nav.push(option.component || HomePage, {'title': option.displayName}, {animate: false});
        // this.nav.setRoot(option.component || HomePage, { 'title': option.displayName });
      }
    });
  }

  public collapseMenuOptions(): void {
    // Collapse all the options
    this.sideMenu.collapseAllOptions();
  }

  public clearProject() {
    this.menuCtrl.close();
    this.nav.pop();
  }
}
