import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { AcceptBalanceRequest } from '../../models/requests/acceptBalance.request';
import { AddMonthRequest } from '../../models/requests/addMonth.request';
import { RejectBalanceRequest } from '../../models/requests/rejectBalance.request';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-monthly-balances',
  templateUrl: './monthly-balances.component.html'
})
export class MonthlyBalancesComponent implements OnInit {
  public formProfit!: FormGroup;
  @Input() corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.prepareFormProfit();
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

  public rejectBalance(monthlyBalanceId: number): void{
    let request = new RejectBalanceRequest(this.getCorporationIdFromRouteParam(), monthlyBalanceId);

    this.corporationService.rejectBalance(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private getCorporationIdFromRouteParam(): number{
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.id;
    });

    return id;
  }

  private prepareFormProfit(): void {
    this.formProfit = this.fb.group({
      totalProfit: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
