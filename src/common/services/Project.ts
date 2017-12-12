import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class Project {

  public changed: EventEmitter<any> = new EventEmitter();
  private data = null;
  canClearProject = true;

  constructor() {
  }

  set(project) {
    this.data = project;
    this.changed.emit({project: project})
  }

  get() {
    return this.data;
  }

  clear() {
    if (this.canClearProject) {
      this.set(null);
    }
  }

  has() {
    if (this.data) {
      return true;
    }
    return false;
  }

}
