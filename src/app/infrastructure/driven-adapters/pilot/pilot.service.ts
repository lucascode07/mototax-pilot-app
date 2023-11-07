import { Injectable } from '@angular/core';
import { Pilot } from '../../../domain/pilot/models/pilot.model';
import { PilotGateway } from '../../../domain/pilot/gateway/pilot.gateway';
import { Observable, catchError, delay, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../../ui/shared/utils/interfaces/login-response.interface';
import {
  PilotAttributes,
  RegisterResponse,
} from '../../../ui/shared/utils/interfaces/register-response.interface';

@Injectable()
export class PilotService implements PilotGateway {
  constructor(private _http: HttpClient) {}

  public login(identifier: string, password: string): Observable<Pilot | null> {
    return this._http
      .get<LoginResponse>(
        `${environment.MOTOTAX_API_URL}/api/pilots?filters[password]=${password}&filters[cellphone]=${identifier}&populate=*`
      )
      .pipe(
        delay(1000),
        switchMap((res) => of(res.data[0]?.attributes ?? null)),
        catchError((err) => throwError(() => err))
      );
  }

  public register(pilot: Pilot): Observable<PilotAttributes> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(pilot));
    formData.append(
      'files.profilePhoto',
      pilot.profilePhoto as File,
      (pilot.profilePhoto as File).name
    );

    return this._http
      .post<RegisterResponse>(
        `${environment.MOTOTAX_API_URL}/api/pilots`,
        formData
      )
      .pipe(
        switchMap((res) => of(res.data.attributes)),
        catchError((err) => throwError(() => err))
      );
  }
}
