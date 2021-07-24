import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

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
import { UserCorporationsPageComponent } from './corporations/pages/user-corporations-page/user-corporations-page.component';

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
    UserCorporationsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,   
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
