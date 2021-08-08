import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest } from "src/app/accounts/models/requests/login.request";
import { environment } from "src/environments/environment";
import { ResponseBase } from "src/app/shared/models/responseBase";
import { RegisterRequest } from "src/app/accounts/models/requests/register.request";
import { UserInfoQueryResult } from "../models/queryResults/userInfo.queryResult";
import { BaseService } from "src/app/shared/services/base.service";
import { ChangeLicenseRequest } from "../models/requests/changeLicense.request";

@Injectable({
    providedIn: 'root'
})
export class AccountsService extends BaseService {
    constructor(http: HttpClient) {
        super(http);
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

    changeLicense(changeLicenseRequest: ChangeLicenseRequest) {
        const path = environment.UrlBase + 'Accounts/change-license';

        var response = this.http.put<ResponseBase<any>>(path, changeLicenseRequest, { headers: this.composeHeaders() });
        return response;
    }
}

