import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { ActivateCorporationRequest } from '../../models/requests/activateCorporation.request';
import { CorporationDetailedQueryResult } from '../../models/queryResults/corporationDetailed.queryResult';
import { FinishCreationRequest } from '../../models/requests/finishCreation.request';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporation-details-pages',
  templateUrl: './corporation-details-pages.component.html'
})
export class CorporationDetailsPagesComponent implements OnInit {
  public corporationResponse: CorporationDetailedQueryResult = new CorporationDetailedQueryResult();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
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
}
