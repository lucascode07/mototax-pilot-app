import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PilotUseCasesService } from '../../../domain/pilot/usecases/pilot.usecases';
import { Router } from '@angular/router';
import { FormsValidatorService } from '../../shared/services/forms-validator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @ViewChild('password')
  public inputPass!: ElementRef<HTMLInputElement>;

  public loginForm: FormGroup = this._fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public showLoaderSpinner: boolean = false;
  public showErrorAlert: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _formsValidator: FormsValidatorService,
    private _pilotUseCase: PilotUseCasesService,
    private _router: Router
  ) {}

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.showLoaderSpinner = true;

    this._pilotUseCase
      .login(this.loginForm.value.identifier, this.loginForm.value.password)
      .subscribe((res) => {
        if (!res) {
          this.showLoaderSpinner = false;
          this.showErrorAlert = true;
          return;
        }
        this.showLoaderSpinner = false;
        localStorage.setItem('user-pilot', JSON.stringify(res));
        this._router.navigateByUrl('/');
      });
  }

  public isValidField(field: string): boolean | null {
    return this._formsValidator.isValidField(this.loginForm, field);
  }

  public showHidePassword({ target }: Event) {
    const { checked } = target as HTMLInputElement;
    if (checked) {
      this.inputPass.nativeElement.type = 'text';
    } else {
      this.inputPass.nativeElement.type = 'password';
    }
  }

  public closeAlert(): void {
    this.showErrorAlert = false;
  }
}
