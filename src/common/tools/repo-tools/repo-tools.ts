import {Injectable} from "@angular/core";

@Injectable()
export class RepoTools {

  b64DecodeUnicode(str: string): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }

  replace_image_urls(str: string, web_url: string): string {
    return str.split("](/uploads/").join("](" + web_url + "/uploads/");
  }

  process_md_content(content: string, web_url: string): string {
    return this.replace_image_urls(this.b64DecodeUnicode(content), web_url);
  }

  find_readme(tree) {
    for (let dir of tree) {
      if (dir.name == 'README.md') {
        return dir;
      }
    }
    for (let dir of tree) {
      if (dir.name.toLowerCase().includes('readme')) {
        return dir;
      }
    }
    return null;
  }

}
