import { Component, Input } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';
import { XBoolean, XInputBoolean } from '@ng-nest/ui/core';

/**
 * Switch
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';

/**
 * Switch Property
 */
@Component({ template: '' })
export class XSwitchProperty extends XControlValueAccessor<boolean> implements XSwitchOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  @Input() @XInputBoolean() loading: XBoolean = false;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  @Input() @XInputBoolean() control: XBoolean = false;
}

/**
 * Switch Option
 * @undocument true
 */
export interface XSwitchOption extends XFormOption {}
