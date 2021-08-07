import { Component, Input, OnInit } from '@angular/core';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { PeriodDetailedQueryResult } from '../../models/queryResults/periodDetailed.queryResult';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-period-details',
  templateUrl: './period-details.component.html'
})
export class PeriodDetailsComponent implements OnInit {
  @Input() monthlyBalanceId!: number;
  @Input() shouldLoad: boolean = true;

  public periodDetailedReponse: PeriodDetailedQueryResult = new PeriodDetailedQueryResult();

  constructor(private corporationService: CorporationService) { }

  ngOnInit(): void {
    if (this.shouldLoad) {
      this.loadPeriodDetailed();
    }
  }

  private loadPeriodDetailed(): void {
    this.corporationService.getPeriodDetailed(this.monthlyBalanceId)
      .subscribe((queryResult: SingleQueryResult<PeriodDetailedQueryResult>) => {
        this.periodDetailedReponse = queryResult.data;
      });
  }
}
