import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { SingleQueryResult } from 'src/app/shared/queryResults/single.queryResult';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { LicenseDetailsQueryResult } from '../../models/queryResults/licenseDetails.queryResult';
import { PayLicenseRequest } from '../../models/requests/payLicense.request.';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-license-payment-page',
  templateUrl: './license-payment-page.component.html'
})
export class LicensePaymentPageComponent implements OnInit {
  public licenseResponse: LicenseDetailsQueryResult = new LicenseDetailsQueryResult();

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrUtils: ToastrUtils, 
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.loadLicense();
  }

  payLicense(): void {
    var request = new PayLicenseRequest();
    request.license = this.licenseResponse.code;

    this.accountsService.payLicense(request)
      .subscribe((data: ResponseBase<any>) => {
         this.toastrUtils.DisplayNotification(data);
      });
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
