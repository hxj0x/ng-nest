import { Component } from '@angular/core';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XAddSeconds } from '@ng-nest/ui/core';
import { XStatisticModule } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XAlertComponent, XStatisticModule],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  deadline = XAddSeconds(new Date(), 10).getTime();
  close() {}
}
