import {EventEmitter, Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

@Injectable()
export class Auth {
  authChanged: EventEmitter<any> = new EventEmitter();
  isLoggedIn: boolean = false;
  token: string = '';


  constructor(private storage: Storage) {
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

}
