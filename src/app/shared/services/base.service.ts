import { HttpClient, HttpHeaders } from "@angular/common/http";

export abstract class BaseService {
    constructor(protected http: HttpClient) { }

    public composeHeaders() {
        const token: string = localStorage.getItem('token') as string;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;
    }
}