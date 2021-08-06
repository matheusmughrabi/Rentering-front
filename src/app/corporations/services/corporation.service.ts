import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcceptBalanceRequest } from '../models/requests/acceptBalance.request';
import { AcceptParticipationRequest } from '../models/requests/acceptParticipation.request';
import { ActivateCorporationRequest } from '../models/requests/activateCorporation.request';
import { AddMonthRequest } from '../models/requests/addMonth.request';
import { CorporationDetailedQueryResult } from '../models/queryResults/corporationDetailed.queryResult';
import { CreateCorporationRequest } from '../models/requests/createCorporation.request';
import { FinishCreationRequest } from '../models/requests/finishCreation.request';
import { InvitationQueryResult } from '../models/queryResults/invitations.queryResult';
import { InviteToCorporationRequest } from '../models/requests/inviteParticipant.request';
import { RejectParticipationRequest } from '../models/requests/rejectParticipation.request';
import { UserCorporationQueryResult } from '../models/queryResults/userCorporation.queryResult';
import { RejectBalanceRequest } from '../models/requests/rejectBalance.request';
import { BaseService } from 'src/app/shared/services/base.service';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { ListQueryResult } from 'src/app/shared/queryResults/list.queryResult';
import { AddParticipantDescriptionToMonth } from '../models/requests/addParticipantDescriptionToMonth.request';

@Injectable({
  providedIn: 'root'
})
export class CorporationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public composeHeaders() {
    const token: string = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getCorporations(page: number): Observable<ListQueryResult<UserCorporationQueryResult>> {
    return this.http.get<ListQueryResult<UserCorporationQueryResult>>(environment.UrlBase + 'corporation', { headers: this.composeHeaders()});
  }

  getCorporationDetailed(id: number): Observable<SingleQueryResult<CorporationDetailedQueryResult>> {
    return this.http.get<SingleQueryResult<CorporationDetailedQueryResult>>(environment.UrlBase + `corporation/detailed/${id}`, 
    { headers: this.composeHeaders() });
  }

  getInvitations(): Observable<ListQueryResult<InvitationQueryResult>> {
    return this.http.get<ListQueryResult<InvitationQueryResult>>(environment.UrlBase + 'corporation/invitations', { headers: this.composeHeaders() });
  }

  createCorporation(data: CreateCorporationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/create';

    var response = this.http.post<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  inviteParticipant(data: InviteToCorporationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/invite';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  finishCreation(data: FinishCreationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/finish-creation';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  acceptParticipation(data: AcceptParticipationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/participation/accept';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  rejectParticipation(data: RejectParticipationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/participation/reject';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  activateCorporation(data: ActivateCorporationRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/activate';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  addMonth(data: AddMonthRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/add-month';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  acceptBalance(data: AcceptBalanceRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/balance/accept';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  rejectBalance(data: RejectBalanceRequest): Observable<any> {
    const path = environment.UrlBase + 'corporation/balance/reject';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }

  addParticipantDescriptionToMonth(data: AddParticipantDescriptionToMonth): Observable<any> {
    const path = environment.UrlBase + 'corporation/participant-balance/description';

    var response = this.http.put<any>(path, data, { headers: this.composeHeaders() });
    return response;
  }
}
