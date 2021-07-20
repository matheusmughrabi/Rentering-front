import { Component, OnInit } from '@angular/core';
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
  
  constructor(private contractService: ContractsService) { }

  ngOnInit(): void { 
    this.contractService.getPendingInvitations()
      .subscribe(data => {
        this.pendingInvitations = data;
        console.log(data);
      });
  }

  acceptToParticipate(contractId: number): void{
    let acceptToParticipateRequest = new AcceptToParticipateRequest();
    acceptToParticipateRequest.contractId = contractId;

    this.contractService.acceptToParticipate(acceptToParticipateRequest)
      .subscribe();
  }

  rejectToParticipate(contractId: number): void{
    let rejectToParticipateRequest = new RejectToParticipateRequest();
    rejectToParticipateRequest.contractId = contractId;

    this.contractService.rejectToParticipate(rejectToParticipateRequest)
      .subscribe();
  }
}
