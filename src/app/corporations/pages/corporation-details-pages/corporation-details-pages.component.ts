import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { CorporationDetailedResponse } from '../../models/corporationDetailed.models';
import { FinishCreationRequest } from '../../models/finishCreation.models';
import { InviteToCorporationRequest } from '../../models/inviteParticipant.models';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporation-details-pages',
  templateUrl: './corporation-details-pages.component.html'
})
export class CorporationDetailsPagesComponent implements OnInit {
  public form!: FormGroup;
  public corporationResponse: CorporationDetailedResponse = new CorporationDetailedResponse();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
    this.prepareForm();
  }

  public inviteParticipant(): void{
    let inviteToCorporation = new InviteToCorporationRequest();
    inviteToCorporation.contractId = this.getCorporationIdFromRouteParam();
    inviteToCorporation.email = this.form.value['email'];
    inviteToCorporation.sharedPercentage = this.form.value['sharedPercentage'];

    this.corporationService.inviteParticipant(inviteToCorporation)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  public finishCreation(): void{
    let request = new FinishCreationRequest();
    request.corporationId = this.getCorporationIdFromRouteParam();

    this.corporationService.finishCreation(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private loadCorporation(): void{
    let id = this.getCorporationIdFromRouteParam();

    this.corporationService.getCorporationDetailed(id)
    .subscribe((data: CorporationDetailedResponse) => this.corporationResponse = data);
  }

  private getCorporationIdFromRouteParam(): number{
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.id;
    });

    return id;
  }

  private prepareForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],

      sharedPercentage: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
