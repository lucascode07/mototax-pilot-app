import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { RegisterPageComponent } from './ui/pages/register-page/register-page.component';
import { MainPageComponent } from './ui/pages/main-page/main-page.component';
import { privateRoutesGuard } from './ui/guard/private.guard';
import { publicRouteGuard } from './ui/guard/public.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [publicRouteGuard],
  },
  {
    path: 'registro',
    component: RegisterPageComponent,
    canActivate: [publicRouteGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [privateRoutesGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
