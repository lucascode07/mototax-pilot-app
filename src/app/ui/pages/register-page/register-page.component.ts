import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EMAIL_REGEXP,
  ONLY_NUMBERS_REGEXP,
} from '../../shared/utils/constants/regex.constant';
import { FormsValidatorService } from '../../shared/services/forms-validator.service';
import { PilotUseCasesService } from '../../../domain/pilot/usecases/pilot.usecases';
import { pilotMapper } from '../../shared/utils/mappers/pilot.mapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnDestroy {
  public registerForm: FormGroup = this._fb.group(
    {
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      celular: [
        '',
        [
          Validators.required,
          Validators.pattern(ONLY_NUMBERS_REGEXP),
          Validators.minLength(9),
        ],
      ],
      fotoPerfil: [null, Validators.required],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: [
        this._formsValidator.isFieldOneEqualFieldTwo(
          'password',
          'passwordConfirm'
        ),
      ],
    }
  );

  public photoPreview: string = 'assets/images/photo-placeholder.webp';
  public showLoaderSpinner: boolean = false;
  public showAlert: boolean = false;
  public redirectTimeout?: number;

  constructor(
    private _fb: FormBuilder,
    private _formsValidator: FormsValidatorService,
    private _pilotUseCase: PilotUseCasesService,
    private _router: Router
  ) {}

  public onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.showLoaderSpinner = true;
    const pilot = pilotMapper(this.registerForm.value);

    this._pilotUseCase.register(pilot).subscribe((pilot) => {
      this.showAlert = true;

      this._pilotUseCase
        .login(pilot.celular, pilot.password)
        .subscribe((res) => {
          sessionStorage.setItem('user-pilot', JSON.stringify(res));
          this.redirectTimeout = window.setTimeout(() => {
            this.showLoaderSpinner = false;
            this._router.navigateByUrl('/');
          }, 2000);
        });
    });
  }

  public onFileChange(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files![0];
    this.registerForm.patchValue({ [field]: file });
    this.registerForm.get(field)?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  public isValidField(field: string): boolean | null {
    return this._formsValidator.isValidField(this.registerForm, field);
  }

  public getFieldError(field: string, fieldName?: string): string | null {
    return this._formsValidator.getFieldError(
      this.registerForm,
      field,
      fieldName
    );
  }

  public getLimitDateAllowed() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    clearTimeout(this.redirectTimeout);
  }
}
