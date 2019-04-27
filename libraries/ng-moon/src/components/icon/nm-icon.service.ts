import { Injectable, SecurityContext, Optional, Inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { errorUrlNotSafe, warnSVGTagNotFound } from '../../core/util';
import { DOCUMENT } from '@angular/common';

// @dynamic
@Injectable({ providedIn: "root" })
export class NmIconService {
  rootUrl = `https://raw.githubusercontent.com/NG-NEST/ng-moon/master/src/assets/icons/`;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Optional() @Inject(DOCUMENT) private document: Document
  ) {}

  getSvgElement(icon: string): Observable<SVGElement> {
    const url = `${this.rootUrl}${icon}.svg`;
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    if (!safeUrl) errorUrlNotSafe(safeUrl);
    return this.http.get(safeUrl, { responseType: "text" }).pipe(
      map(x => {
        const div = this.document.createElement("div");
        div.innerHTML = x.replace(/(<[svg\s\/>]+)\b[^>]*>/gi, "$1>");
        const svg: SVGElement = div.querySelector("svg");
        if (!svg) {
          throw warnSVGTagNotFound();
        }
        return svg;
      })
    );
  }
}
