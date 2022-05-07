import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XUploadModule } from '@ng-nest/ui/upload';
import { ExDefaultComponent } from './default/default.component';
import { TeUploadComponent } from './upload.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XUploadModule, XLayoutModule],
  declarations: [TeUploadComponent, ExDefaultComponent]
})
export class TeUploadModule {}