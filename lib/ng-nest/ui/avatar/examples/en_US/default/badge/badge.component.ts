import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XBadgeComponent } from '@ng-nest/ui/badge';

@Component({
  selector: 'ex-badge',
  standalone: true,
  imports: [CommonModule, XBadgeComponent, XAvatarComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class ExBadgeComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
}
