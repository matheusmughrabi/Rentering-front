import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest } from "src/app/accounts/models/requests/login.request";
import { environment } from "src/environments/environment";
import { ResponseBase } from "src/app/shared/models/responseBase";
import { RegisterRequest } from "src/app/accounts/models/requests/register.request";
import { UserInfoQueryResult } from "../models/queryResults/userInfo.queryResult";
import { BaseService } from "src/app/shared/services/base.service";
import { SingleQueryResult } from "src/app/shared/queryResults/single.queryResult";
import { LicenseDetailsQueryResult } from "../models/queryResults/licenseDetails.queryResult";
import { PayLicenseRequest } from "../models/requests/payLicense.request.";

@Injectable({
    providedIn: 'root'
})
export class AccountsService extends BaseService {
    constructor(http: HttpClient) {
        super(http);
    }

    getLicense(id: number): Observable<SingleQueryResult<LicenseDetailsQueryResult>> {
        return this.http.get<SingleQueryResult<LicenseDetailsQueryResult>>(environment.UrlBase + `Accounts/license-details/${id}`, 
        { headers: this.composeHeaders() });
      }

    login(loginRequest: LoginRequest): Observable<ResponseBase<UserInfoQueryResult>> {
        const path = environment.UrlBase + 'Accounts/Login';

        var response = this.http.post<ResponseBase<UserInfoQueryResult>>(path, loginRequest);
        return response;
    }

    createAccount(createAccountRequest: RegisterRequest) {
        const path = environment.UrlBase + 'Accounts/Register';

        var response = this.http.post<ResponseBase<UserInfoQueryResult>>(path, createAccountRequest);
        return response;
    }

    payLicense(payLicenseRequest: PayLicenseRequest) {
        const path = environment.UrlBase + 'Accounts/pay-license';

        var response = this.http.put<ResponseBase<any>>(path, payLicenseRequest, { headers: this.composeHeaders() });
        return response;
    }
}