import { Component, OnInit } from '@angular/core';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
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
    private toastrUtils: ToastrUtils,
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
      (data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  rejectToParticipate(contractId: number, accountContractId: number): void{
    let rejectToParticipateRequest = new RejectToParticipateRequest();
    rejectToParticipateRequest.contractId = contractId;
    rejectToParticipateRequest.accountContractId = accountContractId;

    this.contractService.rejectToParticipate(rejectToParticipateRequest)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }
}
