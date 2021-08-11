import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ListQueryResult } from 'src/app/shared/queryResults/list.queryResult';
import { PaginationResult } from 'src/app/shared/queryResults/paginated.queryResult';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { UserCorporationQueryResult } from '../../models/queryResults/userCorporation.queryResult';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporations-page',
  templateUrl: './corporations-page.component.html'
})
export class CorporationsPageComponent implements OnInit {
  public form!: FormGroup;
  public userCorporationsPaginated: ListQueryResult<UserCorporationQueryResult> = new ListQueryResult<UserCorporationQueryResult>();
  public busy: boolean = false;
  public paginationResult: PaginationResult = new PaginationResult();

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

    this.corporationService.getCorporations(1)
      .subscribe(
        (queryResult: ListQueryResult<UserCorporationQueryResult>) => {
          this.userCorporationsPaginated = queryResult;

          this.userCorporationsPaginated.data.sort((a, b) => {
            if(a.createDate < b.createDate){
              return 1;
            }
            else{
              return -1;
            }
          });

          this.paginationResult.page = 1;
          this.paginationResult.recordsPerPage = 10;
          this.paginationResult.totalRecords = queryResult.data.length;

          this.busy = false;
        });
  }

  createCorporation(): void {
    this.corporationService.createCorporation(this.form.value)
      .subscribe((data: ResponseBase<any>) => {
        this.toastrUtils.DisplayNotification(data);
        this.loadUserCorporations();
      });

      this.form.reset();
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
