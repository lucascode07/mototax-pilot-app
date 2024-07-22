import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsValidatorService } from '../../shared/services/forms-validator.service';

@Component({
  selector: 'mototax-driver-license-form',
  templateUrl: './driver-license-form.component.html',
  styleUrls: ['./driver-license-form.component.scss'],
})
export class DriverLicenseFormComponent {
  @Input() public driverLicenseForm!: FormGroup;

  public frontPhotoPreview: string = 'assets/images/image-placeholder.webp';
  public backPhotoPreview: string = 'assets/images/image-placeholder.webp';
  // public policeRecordPreview: string = 'assets/images/image-placeholder.webp';

  constructor(private _formServices: FormsValidatorService) {}

  public onFileChange(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files![0];
    this.driverLicenseForm.patchValue({ [field]: file });
    this.driverLicenseForm.get(field)?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      switch (field) {
        case 'fotoFrontal':
          this.frontPhotoPreview = reader.result as string;
          break;
        case 'fotoPosterior':
          this.backPhotoPreview = reader.result as string;
          break;
        // case 'antecedentePolicial':
        //   this.policeRecordPreview = reader.result as string;
        //   break;
      }
    };
    reader.readAsDataURL(file);
  }

  public isValidField(field: string): boolean | null {
    return this._formServices.isValidField(this.driverLicenseForm, field);
  }

  public getFieldError(field: string, fieldName?: string): string | null {
    return this._formServices.getFieldError(
      this.driverLicenseForm,
      field,
      fieldName
    );
  }

  public getLimitDateAllowed() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }
}
