import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AcceptToParticipateRequest } from '../../models/acceptToParticipate.models';
import { PendingInvitationResponse } from '../../models/pendingInvitation.models';
import { RejectToParticipateRequest } from '../../models/rejectToParticipate.models';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-pending-invitations-page',
  templateUrl: './pending-invitations-page.component.html'
})
export class PendingInvitationsPageComponent implements OnInit {
  public pendingInvitations!: PendingInvitationResponse[];
  
  constructor(
    private toastr: ToastrService,
    private contractService: ContractsService) { }

  ngOnInit(): void { 
    this.contractService.getPendingInvitations()
      .subscribe(data => {
        this.pendingInvitations = data;
        console.log(data);
      });
  }

  acceptToParticipate(contractId: number, accountContractId: number): void{
    let acceptToParticipateRequest = new AcceptToParticipateRequest();
    acceptToParticipateRequest.contractId = contractId;
    acceptToParticipateRequest.accountContractId = accountContractId;

    this.contractService.acceptToParticipate(acceptToParticipateRequest)
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

  rejectToParticipate(contractId: number, accountContractId: number): void{
    let rejectToParticipateRequest = new RejectToParticipateRequest();
    rejectToParticipateRequest.contractId = contractId;
    rejectToParticipateRequest.accountContractId = accountContractId;

    this.contractService.rejectToParticipate(rejectToParticipateRequest)
      .subscribe();
  }
}
