import { Component, Input } from '@angular/core';

@Component({
  selector: 'mototax-response-step',
  templateUrl: './response-step.component.html',
  styleUrls: ['./response-step.component.scss'],
})
export class ResponseStepComponent {
  @Input() public isSuccessResponse: boolean = false;

  get titleMessagge(): string {
    if (this.isSuccessResponse) {
      return 'Documentación registrada';
    } else {
      return 'Error al registrar la documentación';
    }
  }

  get iconMessagge(): string {
    if (this.isSuccessResponse) {
      return 'bi bi-check2-circle icon-response text-success';
    } else {
      return 'bi bi-x-circle icon-response text-danger'
    }
  }

  get textMessagge(): string {
    if (this.isSuccessResponse) {
      return 'Su documentación ha sido actualizada correctamente';
    } else {
      return 'Se produjo un error. Inténtelo nuevamente.'
    }
  }
}
