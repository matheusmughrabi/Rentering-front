import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { ChangeLicenseRequest } from '../../models/requests/changeLicense.request';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-license-page',
  templateUrl: './license-page.component.html'
})
export class LicensePageComponent implements OnInit {
  public formLicense!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastrUtils: ToastrUtils,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.setLicenseForm();
  }

  changeLicense(): void {
    var request = new ChangeLicenseRequest();
    request.license = this.formLicense.value['license']

    this.accountsService.changeLicense(request)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.formLicense.reset();
      });
  }

  private setLicenseForm(): void {
    this.formLicense = this.formBuilder.group({
      license: ['', Validators.compose([
        Validators.required
      ])],
    })
  }
}
