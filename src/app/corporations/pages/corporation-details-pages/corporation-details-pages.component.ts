import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { CorporationDetailedResponse } from '../../models/corporationDetailed.models';
import { InviteToCorporationRequest } from '../../models/inviteParticipant.models';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-corporation-details-pages',
  templateUrl: './corporation-details-pages.component.html'
})
export class CorporationDetailsPagesComponent implements OnInit {
  public form!: FormGroup;
  public corporationResponse: CorporationDetailedResponse = new CorporationDetailedResponse();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadCorporation();
    this.prepareForm();
  }

  public inviteParticipant(): void{
    let inviteToCorporation = new InviteToCorporationRequest();
    inviteToCorporation.contractId = this.getCorporationIdFromRouteParam();
    inviteToCorporation.accountId = this.form.value['accountId'];
    inviteToCorporation.sharedPercentage = this.form.value['sharedPercentage'];

    this.corporationService.inviteParticipant(inviteToCorporation)
      .subscribe(
        (data: ResponseBase<any>) => {
          if (data.success) {
            this.toastr.success(data.message, 'Notificação');           
          }
          else{
            data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
          }
        },
        (error) => console.log(error)
      );
  }

  private loadCorporation(): void{
    let id = this.getCorporationIdFromRouteParam();

    this.corporationService.getCorporationDetailed(id)
    .subscribe(
      (data: CorporationDetailedResponse) => {
        this.corporationResponse = data;
      },
      (error) => console.log(error));
  }

  private getCorporationIdFromRouteParam(): number{
    let id!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      id = paramsId.id;
    });

    return id;
  }

  private prepareForm(): void {
    this.form = this.fb.group({
      accountId: ['', Validators.compose([
        Validators.required
      ])],

      sharedPercentage: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
