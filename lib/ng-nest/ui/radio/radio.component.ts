import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { XRadioPrefix, XRadioNode, XRadioProperty } from './radio.property';
import { Subject } from 'rxjs';
import { XIsChange, XSetData, XClearClass, XConfigService } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRadioComponent)]
})
export class XRadioComponent extends XRadioProperty implements OnChanges {
  @ViewChild('radio', { static: true }) radio!: ElementRef<HTMLElement>;
  nodes: XRadioNode[] = [];
  radioType!: 'initial' | 'button' | 'icon' | 'tag';
  private _unSubject = new Subject<void>();

  get beforeIsTemplate() {
    return this.before instanceof TemplateRef;
  }

  get afterIsTemplate() {
    return this.after instanceof TemplateRef;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.radio.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setRadioType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  override writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setRadioType() {
    if (this.button) {
      this.radioType = 'button';
    } else if (this.icon) {
      this.radioType = 'icon';
    } else if (this.tag) {
      this.radioType = 'tag';
    } else {
      this.radioType = 'initial';
    }
    this.cdr.detectChanges();
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabled || node.disabled || (!this.allowCancel && node.id === this.value)) return;
    this.formControlValidator();
    if (this.allowCancel && node.id === this.value) {
      this.value = null;
    } else {
      this.value = node.id;
    }
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  private setData() {
    XSetData<XRadioNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }

  trackByItem(_index: number, item: XRadioNode) {
    return item.id;
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
