import {EventEmitter, Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Injectable()
export class Auth {
  authChanged: EventEmitter<any> = new EventEmitter();
  isLoggedIn: boolean = false;
  token: string = '';


  constructor(private storage: Storage, private iab: InAppBrowser) {
  }

  login(token: any, silent: boolean = false) {
    return this.storage.set('token', token).then(() => {
      this.isLoggedIn = true;
      this.token = token;
      if (!silent)
        this.authChanged.emit({isLoggedIn: this.isLoggedIn, token: this.token});
    })
  }

  logout() {
    this.storage.remove('token').then(() => {
      this.isLoggedIn = false;
      this.token = '';
      this.authChanged.emit({isLoggedIn: this.isLoggedIn, token: this.token});
    })
  }

  goLogin() {
    const state = Math.random().toString(36).substr(2, 8);
    const client_id = '46b1ed0c950b9445ece44639c2295c199675cfbc0fac3c355e3bd1ce8eca1e79';
    const redirect_uri = encodeURIComponent("http://localhost/auth");
    const ref = this.iab.create('https://gitlab.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token&state=' + state, "_blank", {
      zoom: 'no',
      location: 'no',
      clearcache: 'yes',
      clearsessioncache: 'yes',
    });

    ref.on('loadstart').subscribe((res) => {
      if ((res.url).indexOf("http://localhost/auth") === 0) {
        ref.close();
        let responseParameters = ((res.url).split("#")[1]).split("&");
        let parsedResponse = {};
        for (let i = 0; i < responseParameters.length; i++) {
          parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
        }
        let token = parsedResponse['access_token'];
        let backstate = parsedResponse['state'];
        if (token !== undefined && token !== null && backstate === state) {
          this.login(token);
        }
      }
    });

  }

}
