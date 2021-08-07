import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { PeriodDetailedQueryResult } from '../../models/queryResults/periodDetailed.queryResult';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-period-details-page',
  templateUrl: './period-details-page.component.html'
})
export class PeriodDetailsPageComponent implements OnInit {
  public periodDetailsResponse!: PeriodDetailedQueryResult;
  public corporationId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
    this.corporationId = this.getCorporationIdFromRouteParam();
  }

  private loadCorporation(): void {
    this.corporationService.getPeriodDetailed(this.getMonthlyBalanceIdFromRouteParam())
      .subscribe((queryResult: SingleQueryResult<PeriodDetailedQueryResult>) => {
        this.periodDetailsResponse = queryResult.data;
      });
  }

  private getMonthlyBalanceIdFromRouteParam(): number {
    let monthlyBalanceId!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      monthlyBalanceId = paramsId.monthlyBalanceId;
    });

    return monthlyBalanceId;
  }

  private getCorporationIdFromRouteParam(): number {
    let corporationId!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      corporationId = paramsId.id;
    });

    return corporationId;
  }
}
