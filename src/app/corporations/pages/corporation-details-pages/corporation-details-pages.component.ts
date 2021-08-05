import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { ActivateCorporationRequest } from '../../models/requests/activateCorporation.request';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { FinishCreationRequest } from '../../models/requests/finishCreation.request';
import { CorporationService } from '../../services/corporation.service';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';

@Component({
  selector: 'app-corporation-details-pages',
  templateUrl: './corporation-details-pages.component.html'
})
export class CorporationDetailsPagesComponent implements OnInit {
  public corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();
  public busy: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
  }

  public finishCreation(): void {
    let request = new FinishCreationRequest();
    request.corporationId = this.getCorporationIdFromRouteParam();

    this.corporationService.finishCreation(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.loadCorporation();
      });
  }

  public activateCorporation(): void {
    let request = new ActivateCorporationRequest();
    request.corporationId = this.getCorporationIdFromRouteParam();

    this.corporationService.activateCorporation(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.loadCorporation();
      });
  }

  private loadCorporation(): void {
    this.busy = true;

    this.corporationService.getCorporationDetailed(this.getCorporationIdFromRouteParam())
      .subscribe((queryResult: SingleQueryResult<CorporationDetailedQueryResult>) => {
        this.corporationResponse = queryResult.data;
        this.busy = false;
      });
  }

  private getCorporationIdFromRouteParam(): number {
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.id;
    });

    return id;
  }
}
