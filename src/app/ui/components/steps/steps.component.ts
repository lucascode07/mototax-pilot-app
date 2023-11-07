import { Component, Input } from '@angular/core';

@Component({
  selector: 'mototax-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  @Input() public currentStep: number = 0;

  get progressvalue() {
    return ((this.currentStep - 1) * 100) / 2;
  }
}
