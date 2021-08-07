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

  constructor(
    private activatedRoute: ActivatedRoute,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
  }

  private loadCorporation(): void {
    this.corporationService.getPeriodDetailed(this.getCorporationIdFromRouteParam())
      .subscribe((queryResult: SingleQueryResult<PeriodDetailedQueryResult>) => {
        this.periodDetailsResponse = queryResult.data;
      });
  }

  private getCorporationIdFromRouteParam(): number {
    let monthlyBalanceId!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      monthlyBalanceId = paramsId.monthlyBalanceId;
    });

    return monthlyBalanceId;
  }
}
