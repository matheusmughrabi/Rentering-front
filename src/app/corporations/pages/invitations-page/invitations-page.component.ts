import { Component, OnInit } from '@angular/core';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { AcceptParticipationRequest } from '../../models/requests/acceptParticipation.request';
import { InvitationQueryResult } from '../../models/queryResults/invitations.queryResult';
import { RejectParticipationRequest } from '../../models/requests/rejectParticipation.request';
import { CorporationService } from '../../services/corporation.service';
import { ListQueryResult } from 'src/app/shared/queryResults/list.queryResult';

@Component({
  selector: 'app-invitations-page',
  templateUrl: './invitations-page.component.html'
})
export class InvitationsPageComponent implements OnInit {
  public invitations!: ListQueryResult<InvitationQueryResult>;

  constructor(private toastrUtils: ToastrUtils, private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadInvitations();
  }

  acceptParticipation(corporationId: number, participantId: number): void{
    let request = new AcceptParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.acceptParticipation(request)
    .subscribe((data: ResponseBase<any>) =>{this.toastrUtils.DisplayNotification(data); this.loadInvitations();});
  }

  rejectParticipation(corporationId: number, participantId: number): void{
    let request = new RejectParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.rejectParticipation(request)
    .subscribe(
      (data: ResponseBase<any>) => {this.toastrUtils.DisplayNotification(data); this.loadInvitations();});
  }

  private loadInvitations(): void {
    this.corporationService.getInvitations()
      .subscribe(
        (queryResult: ListQueryResult<InvitationQueryResult>) => {
          this.invitations = queryResult;
        });
  }
}
