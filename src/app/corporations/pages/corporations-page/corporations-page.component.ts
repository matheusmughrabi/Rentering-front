import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { UserCorporationQueryResult } from '../../models/queryResults/userCorporation.queryResult';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporations-page',
  templateUrl: './corporations-page.component.html'
})
export class CorporationsPageComponent implements OnInit {
  public form!: FormGroup;
  public userCorporations!: UserCorporationQueryResult[];
  public busy: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrUtils: ToastrUtils,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadUserCorporations();
    this.setForm();
  }

  loadUserCorporations(): void {
    this.busy = true;

    this.corporationService.getCorporations()
      .subscribe(
        (data: UserCorporationQueryResult[]) => {
          this.userCorporations = data;
          this.busy = false;
        });
  }

  createCorporation(): void {
    this.corporationService.createCorporation(this.form.value)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.loadUserCorporations();
      });
  }

  private setForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
    })
  }
}
