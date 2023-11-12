import { Observable } from 'rxjs';
import { DriverLicenseResponse } from '../models/license-response.model';
import { VehiclesResponse } from '../models/vehicles-response.model';

export abstract class DocumentsGateway {
  public abstract uploadDocuments(
    pilotDocs: any
  ): Observable<[DriverLicenseResponse, VehiclesResponse]>;

  public abstract updatePilotDocuments(
    licenseId: number,
    vehicleId: number
  ): any;
}
