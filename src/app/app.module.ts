import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import localeEsPE from '@angular/common/locales/es-PE';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { RegisterPageComponent } from './ui/pages/register-page/register-page.component';
import { MainPageComponent } from './ui/pages/main-page/main-page.component';
import { PilotService } from './infrastructure/driven-adapters/pilot/pilot.service';
import { PilotGateway } from './domain/pilot/gateway/pilot.gateway';
import { DocsStepperComponent } from './ui/components/docs-stepper/docs-stepper.component';
import { PilotStatusComponent } from './ui/components/pilot-status/pilot-status.component';
import { StepsComponent } from './ui/components/steps/steps.component';
import { DriverLicenseFormComponent } from './ui/components/driver-license-form/driver-license-form.component';
import { VehicleFormComponent } from './ui/components/vehicle-form/vehicle-form.component';
import { ResponseStepComponent } from './ui/components/response-step/response-step.component';
import { DocumentsGateway } from './domain/documents/gateway/documents.gateway';
import { DocumentsService } from './infrastructure/driven-adapters/documents/documents.service';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsPE);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    DocsStepperComponent,
    PilotStatusComponent,
    StepsComponent,
    DriverLicenseFormComponent,
    VehicleFormComponent,
    ResponseStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: PilotGateway,
      useClass: PilotService,
    },
    {
      provide: DocumentsGateway,
      useClass: DocumentsService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
