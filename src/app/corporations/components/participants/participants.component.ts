import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
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
  public busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.prepareForm()
  }

  public inviteParticipant(): void {
    this.busy = true;

    let inviteToCorporation = new InviteToCorporationRequest(
      this.corporationResponse.id,
      this.inviteParticipantForm.value['email'],
      this.inviteParticipantForm.value['sharedPercentage']);

    this.corporationService.inviteParticipant(inviteToCorporation)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);

        this.corporationService.getCorporationDetailed(this.corporationResponse.id)
          .subscribe((queryResult: SingleQueryResult<CorporationDetailedQueryResult>) => {
            this.corporationResponse = queryResult.data;
          });

          this.busy = false
      });
  }

  private prepareForm(): void {
    this.inviteParticipantForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],

      sharedPercentage: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01)
      ])]
    })
  }
}
