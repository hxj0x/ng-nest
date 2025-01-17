import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { XTimePickerDisabledTime, XTimePickerFramePrefix, XTimePickerType } from './time-picker.property';
import { reqAnimFrame, XBoolean, XIdentity, XIsChange, XIsEmpty, XIsFunction, XIsNull, XIsNumber } from '@ng-nest/ui/core';
import { XI18nService, XI18nTimePicker } from '@ng-nest/ui/i18n';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTimePickerFramePrefix}`,
  templateUrl: './time-picker-frame.component.html',
  styleUrls: ['./time-picker-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerFrameComponent {
  @Input() type: XTimePickerType = 'time';
  @Input() value!: number | null;
  @Input() use12Hours!: XBoolean;
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 1;
  @Input() defaultNow = true;
  @Input() disabledTime?: XTimePickerDisabledTime;
  @Input() disabledTimeParam?: any;
  @Output() nodeEmit = new EventEmitter<Date>();
  @ViewChild('hourRef') hourRef?: ElementRef<HTMLElement>;
  @ViewChild('minuteRef') minuteRef?: ElementRef<HTMLElement>;
  @ViewChild('secondRef') secondRef?: ElementRef<HTMLElement>;
  @ViewChild('use12HoursRef') use12HoursRef?: ElementRef<HTMLElement>;
  model!: Date;
  hour!: number | null;
  minute!: number | null;
  second!: number | null;
  use12Hour: string = 'am';
  scrollAnimating: { [key: string]: boolean } = {};
  hourData: XIdentity[] = [];
  minuteData: XIdentity[] = [];
  secondData: XIdentity[] = [];
  use12HoursData: XIdentity[] = [];
  locale: XI18nTimePicker = {};
  isInit = false;
  private _unSubject = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    const { value, disabledTimeParam } = changes;
    if (XIsChange(value)) {
      // this.setDataInit();
      this.init();
      this.setScrollTop(true);
    }
    XIsChange(disabledTimeParam) && this.setDataInit();
  }

  ngOnInit() {
    this.setDataInit();
    this.init();
    this.i18n.localeChange
      .pipe(
        map((x) => x.timePicker as XI18nTimePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        if (this.use12Hours) {
          this.setUse12HoursData();
        }
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.setScrollTop();
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: XI18nService) {}

  setDataInit() {
    this.setHourData();
    this.setMinuteData();
    this.setSecondData();
    this.setUse12HoursData();
  }

  setDisabled(type: 'hours' | 'minutes' | 'seconds', num: number) {
    if (this.disabledTime && XIsFunction(this.disabledTime)) {
      const disabledMap = this.disabledTime(this.disabledTimeParam);
      const { disabledHours, disabledMinutes, disabledSeconds } = disabledMap;
      let disabledNums: number[] = [];
      if (type === 'hours') {
        disabledNums = disabledHours ? disabledHours() : [];
      } else if (type === 'minutes') {
        disabledNums = disabledMinutes ? disabledMinutes() : [];
      } else if (type === 'seconds') {
        disabledNums = disabledSeconds ? disabledSeconds() : [];
      }
      return disabledNums.includes(num);
    }

    return false;
  }

  setHourData() {
    let length = this.use12Hours ? 12 : 24;
    this.hourData = Array.from({ length: Math.ceil(length / this.hourStep) }).map((_, i) => {
      if (this.use12Hours && i === 0) {
        i = 12;
        return {
          disabled: this.setDisabled('hours', i),
          label: this.prefixZero(i, 2),
          id: i
        };
      } else {
        const num = i * this.hourStep;
        return {
          disabled: this.setDisabled('hours', num),
          label: this.prefixZero(num, 2),
          id: num
        };
      }
    });
  }

  setMinuteData() {
    this.minuteData = Array.from({ length: Math.ceil(60 / this.minuteStep) }).map((_, i) => {
      const num = i * this.minuteStep;
      return {
        disabled: this.setDisabled('minutes', num),
        label: this.prefixZero(num, 2),
        id: num
      };
    });
  }

  setSecondData() {
    this.secondData = Array.from({ length: Math.ceil(60 / this.secondStep) }).map((_, i) => {
      const num: number = i * this.secondStep;
      return {
        disabled: this.setDisabled('seconds', num),
        label: this.prefixZero(num, 2),
        id: num
      };
    });
  }

  setUse12HoursData() {
    this.use12HoursData = [
      {
        id: 'am',
        label: this.locale.am
      },
      {
        id: 'pm',
        label: this.locale.pm
      }
    ];
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
      this.setTime(this.model);
    } else {
      if (this.defaultNow) {
        this.model = this.setNow();
      } else {
        this.hour = null;
        this.minute = null;
        this.second = null;
      }
    }
    this.cdr.detectChanges();
  }

  setDefault() {
    this.model = new Date(this.value!);
  }

  setNow() {
    const def = new Date('1970-01-01');
    const now = new Date();
    return new Date(def.getFullYear(), def.getMonth(), def.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  }

  setZero() {
    const def = new Date('1970-01-01');
    return new Date(def.getFullYear(), def.getMonth(), def.getDate(), 0, 0, 0);
  }

  setTime(date: Date) {
    if (this.use12Hours) {
      let hour = date.getHours();
      if (hour > 12) {
        this.hour = hour - 12;
        this.use12Hour = 'pm';
      } else if (hour === 12) {
        this.hour = 12;
        this.use12Hour = 'pm';
      } else {
        this.hour = hour === 0 ? 12 : hour;
        this.use12Hour = 'am';
      }
    } else {
      this.hour = date.getHours();
    }
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  prefixZero(num: number, n: number) {
    return (Array(n).join('0') + num).slice(-n);
  }

  setScrollTop(animating = false) {
    this.selected('hour', this.hourRef?.nativeElement, this.hour!, animating);
    this.selected('minute', this.minuteRef?.nativeElement, this.minute!, animating);
    this.selected('second', this.secondRef?.nativeElement, this.second!, animating);
    this.selected('use12Hour', this.use12HoursRef?.nativeElement, this.use12Hour, animating);
  }

  selected(type: 'hour' | 'minute' | 'second' | 'use12Hour', ele?: HTMLElement, num?: number | string, animating = false) {
    if (!ele || XIsNull(num)) return;
    if (this.scrollAnimating[ele.className]) return;
    let len = Number(num);
    switch (type) {
      case 'hour':
        len = this.hourData.findIndex((x) => x.id === num);
        break;
      case 'minute':
        len = this.minuteData.findIndex((x) => x.id === num);
        break;
      case 'second':
        len = this.secondData.findIndex((x) => x.id === num);
        break;
      case 'use12Hour':
        len = this.use12HoursData.findIndex((x) => x.id === num);
        break;
    }
    let current = ele.querySelector(`.x-list x-list-option:nth-child(${len + 1})`) as HTMLElement;
    if (current) {
      if (animating) {
        this.scrollTo(ele, current.offsetTop, 120);
      } else {
        ele.scrollTop = current.offsetTop;
      }
    }
  }

  isLastItem(data: XIdentity[], item: XIdentity) {
    return data.indexOf(item) === data.length - 1;
  }

  itemClick(type: 'hour' | 'minute' | 'second' | 'use12Hours') {
    if (XIsEmpty(this.model)) {
      this.model = this.setZero();
    }
    switch (type) {
      case 'minute':
        this.model.setMinutes(this.minute!);
        break;
      case 'second':
        this.model.setSeconds(this.second!);
        break;
      case 'hour':
        if (this.use12Hours) {
          if (this.use12Hour === 'pm' && this.hour !== 12) {
            this.model.setHours(this.hour! + 12);
          } else if (this.use12Hour === 'am' && this.hour === 12) {
            this.model.setHours(0);
          } else {
            this.model.setHours(this.hour!);
          }
        } else {
          this.model.setHours(this.hour!);
        }
        break;
      case 'use12Hours':
        if (this.use12Hour === 'pm' && this.hour !== 12) {
          this.model.setHours(this.hour! + 12);
        } else if (this.use12Hour === 'am' && this.hour === 12) {
          this.model.setHours(0);
        } else {
          this.model.setHours(this.hour!);
        }
        break;
    }
    this.setScrollTop(true);
    this.nodeEmit.emit(this.model);
    this.cdr.detectChanges();
  }

  private scrollTo(element: HTMLElement, to: number, duration: number): void {
    const clsName = element.className;
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    this.scrollAnimating[clsName] = true;
    reqAnimFrame(() => {
      const num = element.scrollTop + perTick;
      if (XIsNumber(num) && num !== Infinity) {
        element.scrollTop = num;
      }
      if (element.scrollTop === to || duration <= 0) {
        this.scrollAnimating[clsName] = false;
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
