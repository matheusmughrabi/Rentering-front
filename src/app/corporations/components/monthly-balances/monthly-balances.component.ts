import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { PaginationResult } from 'src/app/shared/queryResults/paginated.queryResult';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
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
  public paginationResult: PaginationResult = new PaginationResult();
  public busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) {
    
  }

  ngOnInit(): void {
    this.prepareFormProfit();
  }

  public addMonth(): void {
    this.busy = true;
    let request = new AddMonthRequest(this.corporationResponse.id, this.formProfit.value['totalProfit']);

    this.corporationService.addMonth(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });
  }

  public acceptBalance(monthlyBalanceId: number): void {
    let request = new AcceptBalanceRequest(this.corporationResponse.id, monthlyBalanceId);

    this.corporationService.acceptBalance(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });
  }

  public rejectBalance(monthlyBalanceId: number): void {
    let request = new RejectBalanceRequest(this.corporationResponse.id, monthlyBalanceId);

    this.corporationService.rejectBalance(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });
  }

  private realoadData(): void {
    this.corporationService.getCorporationDetailed(this.corporationResponse.id)
      .subscribe((queryResult: SingleQueryResult<CorporationDetailedQueryResult>) => {
        this.corporationResponse = queryResult.data;
        this.busy = false;
      });
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
