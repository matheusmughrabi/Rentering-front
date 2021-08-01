import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.prepareFormProfit();
  }

  public addMonth(): void {
    this.busy = true;
    let request = new AddMonthRequest(this.corporationResponse.id, this.formProfit.value['totalProfit']);

    this.corporationService.addMonth(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.busy = false;
      });
  }

  public acceptBalance(monthlyBalanceId: number): void {
    let request = new AcceptBalanceRequest(this.corporationResponse.id, monthlyBalanceId);

    this.corporationService.acceptBalance(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  public rejectBalance(monthlyBalanceId: number): void {
    let request = new RejectBalanceRequest(this.corporationResponse.id, monthlyBalanceId);

    this.corporationService.rejectBalance(request)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  private prepareFormProfit(): void {
    this.formProfit = this.fb.group({
      totalProfit: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01)
      ])]
    })
  }
}
