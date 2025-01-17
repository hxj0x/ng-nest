import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XUploadComponent } from './upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XUploadProperty } from './upload.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XUploadPortalComponent } from './upload-portal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XImageModule } from '@ng-nest/ui/image';
import { XProgressModule } from '@ng-nest/ui/progress';

@NgModule({
  declarations: [XUploadComponent, XUploadPortalComponent, XUploadProperty],
  exports: [XUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    XPortalModule,
    XOutletDirective,
    XButtonComponent,
    XIconComponent,
    XControlValueAccessor,
    XImageModule,
    XProgressModule
  ]
})
export class XUploadModule {}
