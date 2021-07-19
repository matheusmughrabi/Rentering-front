import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserContractResponse } from '../models/contract.models';
import { CreateContractRequest } from '../models/createContract.models';
import { DetailedContractRequest, DetailedContractResponse } from '../models/detailedContract.models';
import { InviteParticipantRequest } from '../models/inviteParticipant.models';
import { RemoveParticipantRequest } from '../models/removeParticipant.models';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token: string = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getContractsOfUser(): Observable<UserContractResponse[]> {
    const path = environment.UrlBase + 'contracts/UserContracts';

    var response = this.http.get<UserContractResponse[]>(path, { headers: this.composeHeaders() });
    return response;
  }

  getContractDetailed(param: DetailedContractRequest): Observable<DetailedContractResponse> {
    const path = environment.UrlBase + `contracts/ContractDetailed/${param.contractId}`;

    var response = this.http.get<DetailedContractResponse>(path, { headers: this.composeHeaders() });
    return response;
  }

  createContract(data: CreateContractRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/CreateContract';

    var response = this.http.post<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  inviteParticipant(data: InviteParticipantRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/InviteParticipant';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  removeParticipant(data: RemoveParticipantRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/RemoveParticipant';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }
}
