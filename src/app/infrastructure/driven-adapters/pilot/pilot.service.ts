import { Injectable } from '@angular/core';
import { Pilot, PilotModel } from '../../../domain/pilot/models/pilot.model';
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

  public getPilotFromLS(): Pilot {
    return JSON.parse(sessionStorage.getItem('user-pilot')!);
  }

  public login(
    identifier: string,
    password: string
  ): Observable<PilotModel | null> {
    return this._http
      .get<LoginResponse>(
        `${environment.MOTOTAX_API_URL}/api/pilots?filters[password]=${password}&filters[celular]=${identifier}&populate[fotoPerfil][populate]=*&populate[licencia][populate]=*&populate[vehiculos][populate]=*`
      )
      .pipe(
        delay(1000),
        switchMap((res) => {
          if (res.data[0]?.attributes) {
            const userPilot: PilotModel = {
              id: res.data[0]?.id,
              ...res.data[0].attributes,
            };
            return of(userPilot);
          } else {
            return of(null);
          }
        }),
        catchError((err) => throwError(() => err))
      );
  }

  public register(pilot: Pilot): Observable<PilotAttributes> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(pilot));
    formData.append(
      'files.fotoPerfil',
      pilot.fotoPerfil as File,
      (pilot.fotoPerfil as File).name
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
