import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { ExDefaultComponent } from './default/default.component';
import { TeAutoCompleteComponent } from './auto-complete.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeAutoCompleteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XAutoCompleteModule, XLayoutModule, XButtonComponent],
  declarations: [TeAutoCompleteComponent, ExDefaultComponent]
})
export class TeAutoCompleteModule {}
