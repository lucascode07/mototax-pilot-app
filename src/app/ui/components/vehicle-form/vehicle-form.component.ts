import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsValidatorService } from '../../shared/services/forms-validator.service';

@Component({
  selector: 'mototax-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent {
  @Input() public vehicleForm!: FormGroup;

  public photoPreview: string = 'assets/images/image-placeholder.webp';
  public soatPreview: string = 'assets/images/image-placeholder.webp';

  constructor(private _formServices: FormsValidatorService) {}

  public isValidField(field: string): boolean | null {
    return this._formServices.isValidField(this.vehicleForm, field);
  }

  public getFieldError(field: string, fieldName?: string): string | null {
    return this._formServices.getFieldError(this.vehicleForm, field, fieldName);
  }

  public onFileChange(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files![0];
    this.vehicleForm.patchValue({ [field]: file });
    this.vehicleForm.get(field)?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      switch (field) {
        case 'foto':
          this.photoPreview = reader.result as string;
          break;
        case 'soat':
          this.soatPreview = reader.result as string;
          break;
      }
    };
    reader.readAsDataURL(file);
  }
}
