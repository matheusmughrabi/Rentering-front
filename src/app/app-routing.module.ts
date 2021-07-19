import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './accounts/pages/login-page/login-page.component';
import { SignupPageComponent } from './accounts/pages/signup-page/signup-page.component';
import { ContractDetailsPageComponent } from './contracts/pages/contract-details-page/contract-details-page.component';
import { CreateContractPageComponent } from './contracts/pages/create-contract-page/create-contract-page.component';
import { UserContractsComponent } from './contracts/pages/user-contracts/user-contracts.component';
import { FramePageComponent } from './shared/pages/master/frame-page.component';
import { AuthGuard } from './shared/routeGuards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},

  {
    path: 'contratos',
    component: FramePageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: UserContractsComponent},
      {path: 'detalhes/:contractId', component: ContractDetailsPageComponent},
      {path: 'novo-contrato', component: CreateContractPageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
