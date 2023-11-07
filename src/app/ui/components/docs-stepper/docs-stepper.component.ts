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
    licenseNumber: ['', [Validators.required]],
    expirationDate: ['', [Validators.required]],
    frontPhoto: [null, [Validators.required]],
    backPhoto: [null, [Validators.required]],
  });

  public vehicleForm: FormGroup = this._fb.group({
    licensePlate: ['', [Validators.required]],
    year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    photo: [null, [Validators.required]],
    circulationCardFront: [null, [Validators.required]],
    circulationCardBack: [null, [Validators.required]],
    soat: [null, [Validators.required]],
  });

  public frontPhotoPreview: string = 'assets/images/image-placeholder.webp';
  public backPhotoPreview: string = 'assets/images/image-placeholder.webp';
  public photoPreview: string = 'assets/images/image-placeholder.webp';
  public circulationCardFrontPreview: string =
    'assets/images/image-placeholder.webp';
  public circulationCardBackPreview: string =
    'assets/images/image-placeholder.webp';
  public soatPreview: string =
    'assets/images/image-placeholder.webp';

  constructor(private _fb: FormBuilder) {}

  public nextStep(): void {
    this.driverLicenseForm.markAllAsTouched();
    if (this.driverLicenseForm.invalid) return;

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
