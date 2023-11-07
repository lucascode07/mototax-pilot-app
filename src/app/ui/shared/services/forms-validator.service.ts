import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormsValidatorService {
  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(
    form: FormGroup,
    field: string,
    fieldName?: string
  ): string | null {
    const errors = form.controls[field].errors ?? {};

    for (const errorKey of Object.keys(errors)) {
      switch (errorKey) {
        case 'required':
          return 'Este campo es requerido';
        case 'pattern':
          return `El formato del ${fieldName ?? 'campo'} es inválido`;
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} dígitos`;
        case 'notEqual':
          return `Las contraseñas no coinciden`;
      }
    }
    return null;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
