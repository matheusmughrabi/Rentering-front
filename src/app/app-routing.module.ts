import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './accounts/pages/login-page/login-page.component';
import { SignupPageComponent } from './accounts/pages/signup-page/signup-page.component';
import { ContractDetailsPageComponent } from './contracts/pages/contract-details-page/contract-details-page.component';
import { CreateContractPageComponent } from './contracts/pages/create-contract-page/create-contract-page.component';
import { UserContractsComponent } from './contracts/pages/user-contracts/user-contracts.component';
import { FramePageComponent } from './shared/pages/master/frame-page.component';
import { AuthGuard } from './routeGuards/auth.guard';
import { LoginGuard } from './routeGuards/login.guard';
import { PendingInvitationsPageComponent } from './contracts/pages/pending-invitations-page/pending-invitations-page.component';
import { CorporationsPageComponent } from './corporations/pages/corporations-page/corporations-page.component';
import { CorporationDetailsPagesComponent } from './corporations/pages/corporation-details-pages/corporation-details-pages.component';
import { InvitationsPageComponent } from './corporations/pages/invitations-page/invitations-page.component';
import { PeriodDetailsPageComponent } from './corporations/pages/period-details-page/period-details-page.component';
import { LicensePageComponent } from './accounts/pages/license-page/license-page.component';
import { ProfilePageComponent } from './accounts/pages/profile-page/profile-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [LoginGuard]},
  {path: 'signup', component: SignupPageComponent, canActivate: [LoginGuard]},

  { path: '',   redirectTo: '/contratos', pathMatch: 'full' },

  {
    path: 'perfil',
    component: FramePageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ProfilePageComponent},
      {path: 'licencas', component: LicensePageComponent}
    ]
  },

  {
    path: 'contratos',
    component: FramePageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: UserContractsComponent},
      {path: 'detalhes/:contractId', component: ContractDetailsPageComponent},
      {path: 'novo-contrato', component: CreateContractPageComponent},
      {path: 'convites-pendentes', component: PendingInvitationsPageComponent},
    ]
  },

  {
    path: 'corporacao',
    component: FramePageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: CorporationsPageComponent},
      {path: 'detalhes/:id', component: CorporationDetailsPagesComponent},
      {path: 'detalhes/periodo/:id/:monthlyBalanceId', component: PeriodDetailsPageComponent},
      {path: 'convites', component: InvitationsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
