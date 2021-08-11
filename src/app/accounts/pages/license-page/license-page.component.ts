import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { PayLicenseRequest } from '../../models/requests/payLicense.request.';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-license-page',
  templateUrl: './license-page.component.html'
})
export class LicensePageComponent implements OnInit {
  public formLicense!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }
}
