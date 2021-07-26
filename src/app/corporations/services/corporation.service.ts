import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCorporationRequest } from '../models/createCorporation.models';
import { UserCorporationResponse } from '../models/userCorporation.models';

@Injectable({
  providedIn: 'root'
})
export class CorporationService {

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token: string = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getCorporations(): Observable<UserCorporationResponse[]> {
    return this.http.get<UserCorporationResponse[]>(environment.UrlBase + 'corporation', { headers: this.composeHeaders() });
  }

  createCorporation(data: CreateCorporationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/create';

    var response = this.http.post<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }
}
