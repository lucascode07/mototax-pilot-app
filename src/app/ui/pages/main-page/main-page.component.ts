import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pilot } from '../../../domain/pilot/models/pilot.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public pilotData: Pilot = JSON.parse(localStorage.getItem('user-pilot')!);
  public showDocsStepper: boolean = false;

  constructor(private _router: Router) {}

  get pilotName(): string {
    return this.pilotData.name;
  }

  get isNewAccount(): boolean {
    if (
      this.pilotData.driverLicense.data &&
      this.pilotData.vehicles.data.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  public logout(): void {
    localStorage.removeItem('user-pilot');
    this._router.navigateByUrl('/login');
  }

  public toggleShowDocsStepper(): void {
    this.showDocsStepper = !this.showDocsStepper;
  }
}
