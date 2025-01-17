import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XLoadingComponent } from './loading.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XLoadingProperty } from './loading.property';

@NgModule({
  declarations: [XLoadingComponent, XLoadingProperty],
  exports: [XLoadingComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective, XPortalModule]
})
export class XLoadingModule {}
