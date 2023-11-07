import { Component, Input } from '@angular/core';

@Component({
  selector: 'mototax-pilot-status',
  templateUrl: './pilot-status.component.html',
  styleUrls: ['./pilot-status.component.scss'],
})
export class PilotStatusComponent {
  @Input() public pilotName: string = '';
  @Input() public available: boolean = false;

  get statusClassName(): string {
    if (this.available) {
      return 'badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill';
    } else {
      return 'badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill'
    }
  }
}
