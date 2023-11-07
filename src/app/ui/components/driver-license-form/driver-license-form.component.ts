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
  @Input() public frontPhotoPreview!: string;
  @Input() public backPhotoPreview!: string;

  constructor(private _formServices: FormsValidatorService) {}

  public onFileChangeFront(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.driverLicenseForm.patchValue({ frontPhoto: file });
    this.driverLicenseForm.get('frontPhoto')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.frontPhotoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  public onFileChangeBack(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.driverLicenseForm.patchValue({ backPhoto: file });
    this.driverLicenseForm.get('backPhoto')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.backPhotoPreview = reader.result as string;
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
