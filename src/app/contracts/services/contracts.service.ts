import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcceptPaymentRequest } from '../models/requests/acceptPayment.request';
import { AcceptToParticipateRequest } from '../models/requests/acceptToParticipate.request';
import { ActivateContractRequest } from '../models/requests/activateContract.request';
import { UserContractQueryResult } from '../models/queryResults/contract.queryResult';
import { CreateContractRequest } from '../models/requests/createContract.request';
import { DetailedContractRequest, DetailedContractQueryResult } from '../models/queryResults/detailedContract.queryResul';
import { ExecutePaymentRequest } from '../models/requests/executePayment.request';
import { InviteParticipantRequest } from '../models/requests/inviteParticipant.request';
import { PendingInvitationQueryResult } from '../models/queryResults/pendingInvitation.queryResult';
import { RejectPaymentRequest } from '../models/requests/rejectPayment.request';
import { RejectToParticipateRequest } from '../models/requests/rejectToParticipate.request';
import { RemoveParticipantRequest } from '../models/requests/removeParticipant.request';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getContractsOfUser(): Observable<UserContractQueryResult[]> {
    const path = environment.UrlBase + 'contracts/UserContracts';

    var response = this.http.get<UserContractQueryResult[]>(path, { headers: this.composeHeaders() });
    return response;
  }

  getContractDetailed(param: DetailedContractRequest): Observable<DetailedContractQueryResult> {
    const path = environment.UrlBase + `contracts/ContractDetailed/${param.contractId}`;

    var response = this.http.get<DetailedContractQueryResult>(path, { headers: this.composeHeaders() });
    return response;
  }

  getPendingInvitations(): Observable<PendingInvitationQueryResult[]> {
    const path = environment.UrlBase + `contracts/PendingInvitations`;

    var response = this.http.get<PendingInvitationQueryResult[]>(path, { headers: this.composeHeaders() });
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
