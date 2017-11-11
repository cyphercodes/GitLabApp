import {Injectable} from "@angular/core";
import * as hljs from "highlight.js";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class RepoTools {

  constructor(private sanitizer: DomSanitizer) {

  }

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

  fix_file_content(content: string) {
    let tmpContent;
    tmpContent = hljs.highlightAuto(this.b64DecodeUnicode(content)).value;
    tmpContent = '<code>' + tmpContent;
    tmpContent = tmpContent.replace(/(?:\r\n|\r|\n)/g, '</code><code>');
    tmpContent = tmpContent + "</code>";
    return tmpContent;
  }

  is_image(filename: string) {
    let exts = ["jpeg", "jpg", "png", "gif"];
    let itIs = false;
    for (let ext of exts) {
      if (filename.endsWith(ext)) {
        itIs = true;
      }
    }
    return itIs;
  }

  get_ext(filename: string) {
    let chunks = filename.split(".");
    return chunks[chunks.length - 1];
  }

  build_img_src(file) {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/" + this.get_ext(file.file_name) + ";base64, " + file.content);
  }

}
