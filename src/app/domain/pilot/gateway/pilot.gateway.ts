import { Observable } from "rxjs";
import { Pilot } from "../models/pilot.model";
import { PilotAttributes } from '../../../ui/shared/utils/interfaces/register-response.interface';

export abstract class PilotGateway {
  public abstract login(identifier: string, password: string): Observable<Pilot | null>;
  public abstract register(pilot: Pilot): Observable<PilotAttributes>;
}
