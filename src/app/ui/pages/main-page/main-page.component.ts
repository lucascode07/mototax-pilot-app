import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pilot } from '../../../domain/pilot/models/pilot.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public pilotData: Pilot = JSON.parse(sessionStorage.getItem('user-pilot')!);
  public showDocsStepper: boolean = false;

  constructor(private _router: Router) {}

  get pilotName(): string {
    return this.pilotData.nombres;
  }

  get isNewAccount(): boolean {
    if (
      this.pilotData.licencia.data &&
      this.pilotData.vehiculos.data.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  get isRejected(): boolean {
    if (localStorage.getItem('first-application')) {
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    sessionStorage.removeItem('user-pilot');
    this._router.navigateByUrl('/login');
  }

  public toggleShowDocsStepper(): void {
    this.showDocsStepper = !this.showDocsStepper;
  }
}
