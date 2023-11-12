import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsUseCaseService } from '../../../domain/documents/usecases/documents.usecases';
import { catchError, switchMap, throwError } from 'rxjs';
import { PilotUseCasesService } from '../../../domain/pilot/usecases/pilot.usecases';
import { DriverLicenseResponse } from '../../../domain/documents/models/license-response.model';
import { VehiclesResponse } from '../../../domain/documents/models/vehicles-response.model';
import { Pilot } from '../../../domain/pilot/models/pilot.model';

@Component({
  selector: 'mototax-docs-stepper',
  templateUrl: './docs-stepper.component.html',
  styleUrls: ['./docs-stepper.component.scss'],
})
export class DocsStepperComponent {
  @Output() public hideStepper = new EventEmitter<void>();

  public currentStep: number = 1;
  public isSuccessResponse: boolean = false;
  public isUploadLoading: boolean = false;

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

  constructor(
    private _fb: FormBuilder,
    private _documentsUseCase: DocumentsUseCaseService,
    private _pilotUseCase: PilotUseCasesService
  ) {}

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
    this.isUploadLoading = true;

    if (this.driverLicenseForm.invalid || this.vehicleForm.invalid) return;

    this._documentsUseCase
      .uploadDocuments({
        licenseData: this.driverLicenseForm.value,
        vehicleData: this.vehicleForm.value,
      })
      .pipe(
        switchMap((res) => {
          this.updateSessionData(res);
          return this._documentsUseCase.updatePilotDocuments(
            res[0].data.id,
            res[1].data.id
          );
        }),
        catchError((err) => {
          this.isUploadLoading = false;
          this.currentStep += 1;
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.isUploadLoading = false;
        this.currentStep += 1;
        this.isSuccessResponse = true;
      });
  }

  private updateSessionData(
    docsData: [DriverLicenseResponse, VehiclesResponse]
  ) {
    const [licenseData, vehicleData] = docsData;
    const pilot: Pilot = JSON.parse(sessionStorage.getItem('user-pilot')!);
    pilot.licencia = licenseData;
    pilot.vehiculos = { data: [vehicleData.data] };
    sessionStorage.setItem('user-pilot', JSON.stringify(pilot));
    localStorage.setItem('first-application', 'true');
  }
}
