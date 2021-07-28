import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseBase } from 'src/app/shared/models/responseBase';
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

  constructor(private toastr: ToastrService, private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadInvitations();
  }

  acceptParticipation(corporationId: number, participantId: number): void{
    let request = new AcceptParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.acceptParticipation(request)
    .subscribe(
      (data: ResponseBase<any>) => {
        if (data.success) {
          this.toastr.success(data.message, 'Notificação');           
        }
        else{
          data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
        }
      },
      (error) => console.log(error)
    );
  }

  rejectParticipation(corporationId: number, participantId: number): void{
    let request = new RejectParticipationRequest();
    request.corporationId = corporationId;
    request.participantId = participantId;

    this.corporationService.rejectParticipation(request)
    .subscribe(
      (data: ResponseBase<any>) => {
        if (data.success) {
          this.toastr.success(data.message, 'Notificação');           
        }
        else{
          data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
        }
      },
      (error) => console.log(error)
    );
  }

  private loadInvitations(): void {
    this.corporationService.getInvitations()
      .subscribe(
        (data: InvitationResponse[]) => {
          this.invitations = data;
        });
  }
}
