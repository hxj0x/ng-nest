import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  Inject,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import { XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { delay, of } from 'rxjs';

@Component({
  selector: `${XHighlightPrefix}`,
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty implements OnChanges {
  @ViewChild('code') codeRef!: ElementRef<HTMLElement>;

  display!: SafeHtml;
  lines: string[] = [];
  lineHeight = 1.1875;

  document: Document;
  iconCopy = 'fto-copy';

  platformId = inject(PLATFORM_ID);
  isBrowser = true;

  prism: any;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) document: any
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XHighlightPrefix);
    this.document = document;
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.prism = (window as any)['Prism'];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  setData(): void {
    if (XIsEmpty(this.type)) return;
    if (XIsEmpty(this.data)) this.data = '';
    if (!this.prism && this.isBrowser) {
      console.warn(
        `${XHighlightPrefix}: [${this.type}] file are not supported, the prismjs plugin is used for highlight, so configure the introduction in angular.json.`
      );
      this.display = this.sanitizer.bypassSecurityTrustHtml(this.data as string);
      return;
    }
    if (this.prism?.languages?.[this.type as string]) {
      this.lines = (this.data as string).split(/\n(?!$)/g);
      this.display = this.sanitizer.bypassSecurityTrustHtml(
        this.prism?.highlight(this.data, this.prism?.languages[this.type as string], this.type) +
          this.createLineNumbers() +
          this.createHighlightLines()
      );
    }
    this.cdr.detectChanges();
  }

  createLineNumbers() {
    let result = '';
    if (this.lines?.length > 0) {
      result = `<span class="line-numbers">${new Array(this.lines.length + 1).join(
        '<span></span>'
      )}</span>`;
    }
    return result;
  }

  createHighlightLines() {
    let result = '';
    for (const key in this.highlightLines) {
      const spt = this.highlightLines[key].split(',');
      for (const st of spt) {
        const sp = st.split('-');
        const top = this.lineHeight * (Number(sp[0]) - 1);
        let height = this.lineHeight * (sp.length === 2 ? Number(sp[1]) - Number(sp[0]) + 1 : 1);
        result += `<div class="line-highlight ${key}" style="top: ${top}rem; height: ${height}rem"></div>`;
      }
    }

    return result;
  }

  onCopy() {
    navigator.clipboard.writeText(this.data as string).then(() => {
      this.iconCopy = 'fto-check';
      this.cdr.detectChanges();
      of(true)
        .pipe(delay(2000))
        .subscribe(() => {
          this.iconCopy = 'fto-copy';
          this.cdr.detectChanges();
        });
    });
  }
}
