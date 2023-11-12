import { Injectable } from '@angular/core';
import { DocumentsGateway } from '../gateway/documents.gateway';
import { Observable } from 'rxjs';
import { DriverLicenseResponse } from '../models/license-response.model';
import { VehiclesResponse } from '../models/vehicles-response.model';

@Injectable({ providedIn: 'root' })
export class DocumentsUseCaseService implements DocumentsGateway {
  constructor(private _documentsGateway: DocumentsGateway) {}

  public uploadDocuments(
    pilotDocs: any
  ): Observable<[DriverLicenseResponse, VehiclesResponse]> {
    return this._documentsGateway.uploadDocuments(pilotDocs);
  }

  public updatePilotDocuments(licenseId: number, vehicleId: number) {
    return this._documentsGateway.updatePilotDocuments(licenseId, vehicleId);
  }
}
