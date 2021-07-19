import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest, LoginResponse } from "src/app/accounts/models/login.models";
import { environment } from "src/environments/environment";
import { ResponseBase } from "src/app/shared/models/responseBase";
import { RegisterRequest, RegisterResponse } from "src/app/accounts/models/register.models";

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    constructor(private http: HttpClient) { }

    login(loginRequest: LoginRequest): Observable<ResponseBase<LoginResponse>> {
        const path = environment.UrlBase + 'Accounts/Login';

        var response = this.http.post<ResponseBase<LoginResponse>>(path, loginRequest);
        return response;
    }

    createAccount(createAccountRequest: RegisterRequest){
        const path = environment.UrlBase + 'Accounts/Register';

        var response = this.http.post<ResponseBase<RegisterResponse>>(path, createAccountRequest);
        return response;
    }
}

