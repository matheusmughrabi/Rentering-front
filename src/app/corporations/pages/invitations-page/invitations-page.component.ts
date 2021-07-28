import { Component, OnInit } from '@angular/core';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { AcceptParticipationRequest } from '../../models/acceptParticipation.models';
import { InvitationResponse } from '../../models/invitations.models';
import { RejectParticipationRequest } from '../../models/rejectParticipation.models';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-invitations-page',
  templateUrl: './invitations-page.component.html'
})
export class InvitationsPageComponent implements OnInit {
  public invitations!: InvitationResponse[];

  constructor(private toastrUtils: ToastrUtils, private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadInvitations();
  }

  acceptParticipation(corporationId: number, participantId: number): void{
    let request = new AcceptParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.acceptParticipation(request)
    .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  rejectParticipation(corporationId: number, participantId: number): void{
    let request = new RejectParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.rejectParticipation(request)
    .subscribe(
      (data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private loadInvitations(): void {
    this.corporationService.getInvitations()
      .subscribe(
        (data: InvitationResponse[]) => {
          this.invitations = data;
        });
  }
}
