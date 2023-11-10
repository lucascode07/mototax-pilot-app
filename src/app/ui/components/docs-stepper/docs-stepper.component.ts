import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mototax-docs-stepper',
  templateUrl: './docs-stepper.component.html',
  styleUrls: ['./docs-stepper.component.scss'],
})
export class DocsStepperComponent {
  @Output() public hideStepper = new EventEmitter<void>();

  public currentStep: number = 1;
  public isSuccessResponse: boolean = false;

  public driverLicenseForm: FormGroup = this._fb.group({
    numeroLicencia: ['', [Validators.required]],
    fechaVencimiento: ['', [Validators.required]],
    fotoFrontal: [null, [Validators.required]],
    fotoPosterior: [null, [Validators.required]],
    antecedentePolicial: [null, [Validators.required]],
  });

  public vehicleForm: FormGroup = this._fb.group({
    placa: ['', [Validators.required]],
    anioFabricacion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    foto: [null, [Validators.required]],
    tarjetaCirculacionFrontal: [null, [Validators.required]],
    tarjetaCirculacionTrasera: [null, [Validators.required]],
    soat: [null, [Validators.required]],
  });

  constructor(private _fb: FormBuilder) {}

  public nextStep(): void {
    this.driverLicenseForm.markAllAsTouched();
    if (this.driverLicenseForm.invalid) return;
    window.scrollTo({ top: 0 });
    this.currentStep += 1;
  }

  public backStep(): void {
    if (this.currentStep === 1) {
      this.hideStepper.emit();
      return;
    }
    this.currentStep -= 1;
  }

  public uploadDocuments(): void {
    this.driverLicenseForm.markAllAsTouched();
    this.vehicleForm.markAllAsTouched();

    if (this.driverLicenseForm.invalid || this.vehicleForm.invalid) return;

    this.currentStep += 1;
  }
}
