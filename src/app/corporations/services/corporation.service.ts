import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InviteParticipantRequest } from 'src/app/contracts/models/inviteParticipant.models';
import { environment } from 'src/environments/environment';
import { AcceptParticipationRequest } from '../models/acceptParticipation.models';
import { ActivateCorporationRequest } from '../models/activateCorporation.models';
import { CorporationDetailedResponse } from '../models/corporationDetailed.models';
import { CreateCorporationRequest } from '../models/createCorporation.models';
import { FinishCreationRequest } from '../models/finishCreation.models';
import { InvitationResponse } from '../models/invitations.models';
import { InviteToCorporationRequest } from '../models/inviteParticipant.models';
import { RejectParticipationRequest } from '../models/rejectParticipation.models';
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

  getCorporationDetailed(id: number): Observable<CorporationDetailedResponse> {
    return this.http.get<CorporationDetailedResponse>(environment.UrlBase + `corporation/detailed/${id}`, { headers: this.composeHeaders() });
  }

  getInvitations(): Observable<InvitationResponse[]> {
    return this.http.get<InvitationResponse[]>(environment.UrlBase + 'corporation/invitations', { headers: this.composeHeaders() });
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
}
