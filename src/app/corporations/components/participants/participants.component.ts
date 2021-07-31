import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { InviteToCorporationRequest } from '../../models/requests/inviteParticipant.request';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit {
  public inviteParticipantForm!: FormGroup;
  @Input() corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.prepareForm()
  }

  public inviteParticipant(): void{
    let inviteToCorporation = new InviteToCorporationRequest();
    inviteToCorporation.contractId = this.getCorporationIdFromRouteParam();
    inviteToCorporation.email = this.inviteParticipantForm.value['email'];
    inviteToCorporation.sharedPercentage = this.inviteParticipantForm.value['sharedPercentage'];

    this.corporationService.inviteParticipant(inviteToCorporation)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private getCorporationIdFromRouteParam(): number{
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.id;
    });

    return id;
  }

  private prepareForm(): void {
    this.inviteParticipantForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],

      sharedPercentage: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
