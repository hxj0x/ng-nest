import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  HostBinding,
  inject
} from '@angular/core';
import { XButtonsPrefix, XButtonsProperty } from './button.property';
import { XConfigService } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XButtonsPrefix}`,
  standalone: true,
  imports: [CommonModule, XButtonsProperty],
  template: '<ng-content></ng-content>',
  styleUrls: ['./buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonsComponent extends XButtonsProperty implements OnInit {
  @HostBinding('class.x-buttons-space') get getSpace() {
    return this.space;
  }
  @HostBinding('class.x-buttons-hiddenBorder') get getHiddenBorder() {
    return this.hiddenBorder;
  }

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef<HTMLElement>);
  configService = inject(XConfigService);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XButtonsPrefix);
    this.setSpace();
  }

  setSpace() {
    if (!this.space) return;
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'margin-left',
      `-${Number(this.space) / 2}rem`
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'margin-right',
      `-${Number(this.space) / 2}rem`
    );
  }
}
