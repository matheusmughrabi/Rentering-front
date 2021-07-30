import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { AcceptBalanceRequest } from '../../models/requests/acceptBalance.request';
import { ActivateCorporationRequest } from '../../models/requests/activateCorporation.request';
import { AddMonthRequest } from '../../models/requests/addMonth.request';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { FinishCreationRequest } from '../../models/requests/finishCreation.request';
import { InviteToCorporationRequest } from '../../models/requests/inviteParticipant.request';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporation-details-pages',
  templateUrl: './corporation-details-pages.component.html'
})
export class CorporationDetailsPagesComponent implements OnInit {
  public form!: FormGroup;
  public formProfit!: FormGroup;
  public corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
    this.prepareForm();
    this.prepareFormProfit()
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

  public activateCorporation(): void{
    let request = new ActivateCorporationRequest();
    request.corporationId = this.getCorporationIdFromRouteParam();

    this.corporationService.activateCorporation(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  public addMonth(): void{
    let request = new AddMonthRequest();
    request.corporationId = this.getCorporationIdFromRouteParam();
    request.totalProfit = this.formProfit.value['totalProfit'];

    this.corporationService.addMonth(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  public acceptBalance(monthlyBalanceId: number): void{
    let request = new AcceptBalanceRequest(this.getCorporationIdFromRouteParam(), monthlyBalanceId);

    this.corporationService.acceptBalance(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private loadCorporation(): void{
    let id = this.getCorporationIdFromRouteParam();

    this.corporationService.getCorporationDetailed(id)
    .subscribe((data: CorporationDetailedQueryResult) => this.corporationResponse = data);
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

  private prepareFormProfit(): void {
    this.formProfit = this.fb.group({
      totalProfit: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
