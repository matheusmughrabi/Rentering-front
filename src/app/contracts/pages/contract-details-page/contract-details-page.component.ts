import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from 'src/app/contracts/services/contracts.service';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ToastrUtils } from 'src/app/shared/utils/toastr.utils';
import { AcceptPaymentRequest } from '../../models/acceptPayment.models';
import { ActivateContractRequest } from '../../models/activateContract.models';
import { DetailedContractRequest, DetailedContractResponse } from '../../models/detailedContract.models';
import { ExecutePaymentRequest } from '../../models/executePayment.models';
import { InviteParticipantRequest } from '../../models/inviteParticipant.models';
import { RejectPaymentRequest } from '../../models/rejectPayment.models';
import { RemoveParticipantRequest } from '../../models/removeParticipant.models';

@Component({
  selector: 'app-contract-details-page',
  templateUrl: './contract-details-page.component.html'
})
export class ContractDetailsPageComponent implements OnInit {
  public form!: FormGroup;
  public detailedContractResponse: DetailedContractResponse = new DetailedContractResponse();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastrUtils: ToastrUtils,
    private contractService: ContractsService) { }

  ngOnInit(): void {
    let contractId: number = this.getContractIdFromRouteParam();
    let detailedContractRequest = this.getDetailedContractRequest(contractId);

    this.loadDetailedContractData(detailedContractRequest);

    this.prepareForm();
  }

  activateContract(): void {
    let activateContractRequest = new ActivateContractRequest();
    activateContractRequest.contractId = this.detailedContractResponse.id;

    this.contractService.activateContract(activateContractRequest)
      .subscribe(
        (data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  inviteParticipant(): void {
    console.log(`Dados enviados para o back: ${this.form.value}`)

    let inviteParticipantRequest = new InviteParticipantRequest();
    inviteParticipantRequest.contractId = this.getContractIdFromRouteParam();
    inviteParticipantRequest.email = this.form.value['email'];
    inviteParticipantRequest.participantRole = this.form.value['participantRole'];

    this.contractService.inviteParticipant(inviteParticipantRequest)
      .subscribe(
        (data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  removeParticipant(accountId: number): void {
    let removeParticipantRequest = new RemoveParticipantRequest();
    removeParticipantRequest.contractId = this.getContractIdFromRouteParam();
    removeParticipantRequest.accountId = accountId;

    this.contractService.removeParticipant(removeParticipantRequest)
      .subscribe((data: ResponseBase<any>) => this.toastrUtils.DisplayNotification(data));
  }

  executePayment(month: Date): void {
    let executePaymentRequest = new ExecutePaymentRequest();
    executePaymentRequest.month = month;
    executePaymentRequest.contractId = this.detailedContractResponse.id;

    this.contractService.executePayment(executePaymentRequest)
      .subscribe((data) => this.toastrUtils.DisplayNotification(data));
  }

  acceptPayment(month: Date): void {
    let acceptPaymentRequest = new AcceptPaymentRequest();
    acceptPaymentRequest.month = month;
    acceptPaymentRequest.contractId = this.detailedContractResponse.id;

    this.contractService.acceptPayment(acceptPaymentRequest)
      .subscribe(
        (data) => this.toastrUtils.DisplayNotification(data));
  }

  rejectPayment(month: Date): void {
    let rejectPaymentRequest = new RejectPaymentRequest();
    rejectPaymentRequest.month = month;
    rejectPaymentRequest.contractId = this.detailedContractResponse.id;

    this.contractService.rejectPayment(rejectPaymentRequest)
      .subscribe(
        (data) => this.toastrUtils.DisplayNotification(data));
  }

  private getContractIdFromRouteParam(): number {
    let contractId!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      contractId = paramsId.contractId;
    });

    return contractId;
  }

  private getDetailedContractRequest(contractId: number): DetailedContractRequest {
    let detailedContractRequest = new DetailedContractRequest();
    detailedContractRequest.contractId = contractId;

    return detailedContractRequest;
  }

  private loadDetailedContractData(detailedContractRequest: DetailedContractRequest): void {
    this.contractService.getContractDetailed(detailedContractRequest)
      .subscribe(
        (data: DetailedContractResponse) => this.detailedContractResponse = data);
  }

  private prepareForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],

      participantRole: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
