import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { ExDefaultComponent } from './default/default.component';
import { TeTooltipComponent } from './tooltip.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ExCustomComponent } from './custom/custom.component';
import { XIconComponent } from '@ng-nest/ui/icon';

const routers = [{ path: '', component: TeTooltipComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    XButtonComponent,
    XTooltipModule,
    XLayoutModule,
    XIconComponent
  ],
  declarations: [TeTooltipComponent, ExDefaultComponent, ExCustomComponent]
})
export class TeTooltipModule {}
