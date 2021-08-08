import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { LicenseDetailsQueryResult } from '../../models/queryResults/licenseDetails.queryResult';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-license-payment-page',
  templateUrl: './license-payment-page.component.html'
})
export class LicensePaymentPageComponent implements OnInit {
  public licenseResponse: LicenseDetailsQueryResult = new LicenseDetailsQueryResult();

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.loadLicense();
  }

  private loadLicense(): void {
    this.accountsService.getLicense(this.getLicenseNumberFromRouteParam())
      .subscribe((queryResult: SingleQueryResult<LicenseDetailsQueryResult>) => {
        this.licenseResponse = queryResult.data;
      });
  }

  private getLicenseNumberFromRouteParam(): number {
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.licenseNumber;
    });

    return id;
  }
}
