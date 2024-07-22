import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DocumentsGateway } from '../../../domain/documents/gateway/documents.gateway';
import { environment } from '../../../../environments/environment';
import { VehiclesResponse } from '../../../domain/documents/models/vehicles-response.model';
import { DriverLicenseResponse } from '../../../domain/documents/models/license-response.model';
import { PilotModel } from '../../../domain/pilot/models/pilot.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService implements DocumentsGateway {
  constructor(private _http: HttpClient) {}

  public uploadDocuments({ licenseData, vehicleData }: any) {
    const licenseResponse = this._http.post<DriverLicenseResponse>(
      `${environment.MOTOTAX_API_URL}/api/driver-licenses`,
      this.formDataDriverLicense(licenseData)
    );

    const vehiclesResponse = this._http.post<VehiclesResponse>(
      `${environment.MOTOTAX_API_URL}/api/vehicles`,
      this.formDataVehicle(vehicleData)
    );

    return forkJoin([licenseResponse, vehiclesResponse]);
  }

  public updatePilotDocuments(licenseId: number, vehicleId: number) {
    const { id } = JSON.parse(
      sessionStorage.getItem('user-pilot')!
    ) as PilotModel;

    const requestbody = {
      data: {
        licencia: {
          connect: [licenseId],
        },
        vehiculos: {
          connect: [vehicleId],
        },
      },
    };

    return this._http.put<any>(
      `${environment.MOTOTAX_API_URL}/api/pilots/${id}`,
      requestbody
    );
  }

  private formDataVehicle(pilotDocs: any): FormData {
    const formData = new FormData();
    formData.append('data', JSON.stringify(pilotDocs));
    formData.append(
      'files.foto',
      pilotDocs.foto as File,
      (pilotDocs.foto as File).name
    );
    formData.append(
      'files.tarjetaCirculacionFrontal',
      pilotDocs.tarjetaCirculacionFrontal as File,
      (pilotDocs.tarjetaCirculacionFrontal as File).name
    );
    formData.append(
      'files.tarjetaCirculacionTrasera',
      pilotDocs.tarjetaCirculacionTrasera as File,
      (pilotDocs.tarjetaCirculacionTrasera as File).name
    );
    formData.append(
      'files.soat',
      pilotDocs.soat as File,
      (pilotDocs.soat as File).name
    );

    return formData;
  }

  private formDataDriverLicense(pilotDocs: any): FormData {
    const formData = new FormData();
    formData.append('data', JSON.stringify(pilotDocs));
    formData.append(
      'files.fotoFrontal',
      pilotDocs.fotoFrontal as File,
      (pilotDocs.fotoFrontal as File).name
    );
    formData.append(
      'files.fotoPosterior',
      pilotDocs.fotoPosterior as File,
      (pilotDocs.fotoPosterior as File).name
    );
    // formData.append(
    //   'files.antecedentePolicial',
    //   pilotDocs.antecedentePolicial as File,
    //   (pilotDocs.antecedentePolicial as File).name
    // );

    return formData;
  }
}
