import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAnchorComponent } from './anchor.component';
import { XAffixModule } from '@ng-nest/ui/affix';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XAnchorInnerProperty, XAnchorProperty } from './anchor.property';
import { XAnchorInnerComponent } from './anchor-inner.component';

@NgModule({
  declarations: [XAnchorComponent, XAnchorProperty, XAnchorInnerComponent, XAnchorInnerProperty],
  exports: [XAnchorComponent, XAnchorInnerComponent],
  imports: [CommonModule, XAffixModule, XSliderModule]
})
export class XAnchorModule {}
