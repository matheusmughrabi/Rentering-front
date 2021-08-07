import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { PaginationResult } from 'src/app/shared/queryResults/paginated.queryResult';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { AcceptBalanceRequest } from '../../models/requests/acceptBalance.request';
import { AddMonthRequest } from '../../models/requests/addMonth.request';
import { AddParticipantDescriptionToMonth } from '../../models/requests/addParticipantDescriptionToMonth.request';
import { CloseMonthRequest } from '../../models/requests/closeMonth.request';
import { RegisterIncomeRequest } from '../../models/requests/registerIncome.request';
import { RejectBalanceRequest } from '../../models/requests/rejectBalance.request';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-monthly-balances',
  templateUrl: './monthly-balances.component.html'
})
export class MonthlyBalancesComponent implements OnInit {
  @Input() corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();
  
  public formProfit!: FormGroup;
  public formParticipantBalanceDescription!: FormGroup;
  public formRegisterIncome!: FormGroup;
  public paginationResult: PaginationResult = new PaginationResult();
  public busy: boolean = false;
  public shouldLoad: boolean = false;
  public monthlyBalanceToLoad!: number;

  private monthId!: number;

  constructor(
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) {
  }

  ngOnInit(): void {
    this.prepareFormProfit();
    this.prepareFormParticipantBalanceDescription();
    this.prepareFormRegisterIncome();

    this.sortMonthlyBalances();
  }

  public loadDetails(monthlyBalanceId: number){
    this.shouldLoad = true;
    this.monthlyBalanceToLoad = monthlyBalanceId;
  }

  public addMonth(): void {
    this.busy = true;
    let request = new AddMonthRequest(
      this.corporationResponse.id, 
      this.formProfit.value['startDate'], 
      this.formProfit.value['endDate']);

    this.corporationService.addMonth(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });

    this.formProfit.reset();
  }

  public registerIncome(): void {
    this.busy = true;

    let request = new RegisterIncomeRequest(
      this.corporationResponse.id, 
      this.monthId, 
      this.formRegisterIncome.value['title'], 
      this.formRegisterIncome.value['description'],
      this.formRegisterIncome.value['value']
      );

    this.corporationService.registerIncome(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });

    this.formRegisterIncome.reset();
  }

  public closeMonth(monthlyBalanceId: number): void {
    let request = new CloseMonthRequest(this.corporationResponse.id, monthlyBalanceId);

    this.corporationService.closeMonth(request)
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

  public selectMonth(monthlyBalanceId: number){
    this.monthId = monthlyBalanceId;
  }

  public addParticipantDescriptionToMonth(): void {
    this.busy = true;
    let request = new AddParticipantDescriptionToMonth(this.corporationResponse.id, this.monthId, this.formParticipantBalanceDescription.value['description']);

    this.corporationService.addParticipantDescriptionToMonth(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.realoadData();
      });

      this.formParticipantBalanceDescription.reset();
  }

  private realoadData(): void {
    this.corporationService.getCorporationDetailed(this.corporationResponse.id)
      .subscribe((queryResult: SingleQueryResult<CorporationDetailedQueryResult>) => {
        this.corporationResponse = queryResult.data;
        this.busy = false;

        this.sortMonthlyBalances();
      });
  }

  private prepareFormProfit(): void {
    this.formProfit = this.fb.group({
      startDate: ['', Validators.compose([
        Validators.required
      ])],

      endDate: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  private prepareFormParticipantBalanceDescription(): void {
    this.formParticipantBalanceDescription = this.fb.group({
      description: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  private prepareFormRegisterIncome(): void {
    this.formRegisterIncome = this.fb.group({
      title: ['', Validators.compose([
        Validators.required
      ])],

      description: ['', Validators.compose([
        Validators.required
      ])],

      value: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01)
      ])]
    })
  }

  private sortMonthlyBalances(): void {
    this.corporationResponse.monthlyBalances.sort((a, b) => {
      if (a.startDate < b.startDate) {
        return 1;
      }
      else {
        return -1;
      }
    });
  }
}
