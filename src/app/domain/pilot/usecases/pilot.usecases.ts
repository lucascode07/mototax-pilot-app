import { Injectable } from '@angular/core';
import { PilotGateway } from '../gateway/pilot.gateway';
import { Observable } from 'rxjs';
import { Pilot } from '../models/pilot.model';
import { PilotAttributes } from '../../../ui/shared/utils/interfaces/register-response.interface';

@Injectable({ providedIn: 'root' })
export class PilotUseCasesService implements PilotGateway {
  constructor(private _pilotGateway: PilotGateway) {}

  public getPilotFromLS(): Pilot {
    return this._pilotGateway.getPilotFromLS();
  }
  public login(identifier: string, password: string): Observable<Pilot | null> {
    return this._pilotGateway.login(identifier, password);
  }
  public register(pilot: Pilot): Observable<PilotAttributes> {
    return this._pilotGateway.register(pilot);
  }
}
