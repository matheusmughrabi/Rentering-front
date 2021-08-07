import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './accounts/pages/login-page/login-page.component';
import { SignupPageComponent } from './accounts/pages/signup-page/signup-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FramePageComponent } from './shared/pages/master/frame-page.component';
import { UserContractsComponent } from './contracts/pages/user-contracts/user-contracts.component';
import { CreateContractPageComponent } from './contracts/pages/create-contract-page/create-contract-page.component';
import { ContractDetailsPageComponent } from './contracts/pages/contract-details-page/contract-details-page.component';
import { PendingInvitationsPageComponent } from './contracts/pages/pending-invitations-page/pending-invitations-page.component';
import { CorporationsPageComponent } from './corporations/pages/corporations-page/corporations-page.component';
import { CorporationDetailsPagesComponent } from './corporations/pages/corporation-details-pages/corporation-details-pages.component';
import { InvitationsPageComponent } from './corporations/pages/invitations-page/invitations-page.component';
import { MonthlyBalancesComponent } from './corporations/components/monthly-balances/monthly-balances.component';
import { ParticipantsComponent } from './corporations/components/participants/participants.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PeriodDetailsPageComponent } from './corporations/pages/period-details-page/period-details-page.component';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    NavbarComponent,
    FramePageComponent,
    UserContractsComponent,
    CreateContractPageComponent,
    ContractDetailsPageComponent,
    PendingInvitationsPageComponent,
    CorporationsPageComponent,
    CorporationDetailsPagesComponent,
    InvitationsPageComponent,
    MonthlyBalancesComponent,
    ParticipantsComponent,
    LoadingComponent,
    PeriodDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,   
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule,  
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
