import { Component, inject, Input } from '@angular/core';
import { Photo, Pilot } from '../../../domain/pilot/models/pilot.model';
import { PilotUseCasesService } from '../../../domain/pilot/usecases/pilot.usecases';

@Component({
  selector: 'mototax-pilot-status',
  templateUrl: './pilot-status.component.html',
  styleUrls: ['./pilot-status.component.scss'],
})
export class PilotStatusComponent {
  private readonly _pilotUseCase = inject(PilotUseCasesService);

  @Input() public pilotName: string = '';
  @Input() public available: boolean = false;

  get statusClassName(): string {
    if (this.available) {
      return 'badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill';
    } else {
      return 'badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill';
    }
  }

  get pilotData(): Pilot {
    return this._pilotUseCase.getPilotFromLS();
  }

  get profilePhoto(): Photo {
    return this.pilotData.fotoPerfil as Photo;
  }

  get licensePhotoFront(): Photo {
    return this.pilotData.licencia.data.attributes.fotoFrontal as Photo;
  }

  get licensePhotoBack(): Photo {
    return this.pilotData.licencia.data.attributes.fotoPosterior as Photo;
  }

  get vehiclePhoto(): Photo {
    return this.pilotData.vehiculos.data[0].attributes.foto as Photo;
  }

  get vehicleSoat(): Photo {
    return this.pilotData.vehiculos.data[0].attributes.soat as Photo;
  }

  // get vehicleCirculationFront(): Photo {
  //   return this.pilotData.vehiculos.data[0].attributes
  //     .tarjetaCirculacionFrontal as Photo;
  // }

  // get vehicleCirculationBack(): Photo {
  //   return this.pilotData.vehiculos.data[0].attributes
  //     .tarjetaCirculacionTrasera as Photo;
  // }
}
