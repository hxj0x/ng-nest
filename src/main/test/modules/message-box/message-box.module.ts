import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { ExDefaultComponent } from './default/default.component';
import { TeMessageBoxComponent } from './message-box.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ExConfirmComponent } from './confirm/confirm.component';
import { ExPromptComponent } from './prompt/prompt.component';
import { ExCustomComponent } from './custom/custom.component';
import { XMessageModule } from '@ng-nest/ui/message';
import { ExValidatorComponent } from './validator/validator.component';
import { ExLoadingComponent } from './loading/loading.component';

const routers = [{ path: '', component: TeMessageBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XMessageBoxModule, XMessageModule, XButtonComponent, XLayoutModule],
  declarations: [
    TeMessageBoxComponent,
    ExDefaultComponent,
    ExPromptComponent,
    ExCustomComponent,
    ExConfirmComponent,
    ExValidatorComponent,
    ExLoadingComponent
  ]
})
export class TeMessageBoxModule {}
