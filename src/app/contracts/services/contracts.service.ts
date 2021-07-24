import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcceptPaymentRequest } from '../models/acceptPayment.models';
import { AcceptToParticipateRequest } from '../models/acceptToParticipate.models';
import { ActivateContractRequest } from '../models/activateContract.models';
import { UserContractResponse } from '../models/contract.models';
import { CreateContractRequest } from '../models/createContract.models';
import { DetailedContractRequest, DetailedContractResponse } from '../models/detailedContract.models';
import { ExecutePaymentRequest } from '../models/executePayment.models';
import { InviteParticipantRequest } from '../models/inviteParticipant.models';
import { PendingInvitationResponse } from '../models/pendingInvitation.models';
import { RejectPaymentRequest } from '../models/rejectPayment.models';
import { RejectToParticipateRequest } from '../models/rejectToParticipate.models';
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

  getPendingInvitations(): Observable<PendingInvitationResponse[]> {
    const path = environment.UrlBase + `contracts/PendingInvitations`;

    var response = this.http.get<PendingInvitationResponse[]>(path, { headers: this.composeHeaders() });
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

  acceptToParticipate(data: AcceptToParticipateRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/AcceptToParticipate';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  rejectToParticipate(data: RejectToParticipateRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/RejectToParticipate';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  activateContract(data: ActivateContractRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/Activate';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  executePayment(data: ExecutePaymentRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/ExecutePayment';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }
  
  acceptPayment(data: AcceptPaymentRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/AcceptPayment';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  rejectPayment(data: RejectPaymentRequest): Observable<any> {
    const path = environment.UrlBase + 'contracts/AcceptPayment';

    var response = this.http.patch<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }
}
