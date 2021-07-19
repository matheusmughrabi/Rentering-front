import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from 'src/app/contracts/services/contracts.service';
import { DetailedContractRequest, DetailedContractResponse } from '../../models/detailedContract.models';
import { InviteParticipantRequest } from '../../models/inviteParticipant.models';
import { RemoveParticipantRequest } from '../../models/removeParticipant.models';

@Component({
  selector: 'app-contract-details-page',
  templateUrl: './contract-details-page.component.html'
})
export class ContractDetailsPageComponent implements OnInit {
  public form!: FormGroup;
  public detailedContractResponse: DetailedContractResponse = new DetailedContractResponse();
  private inviteParticipantRequest!: InviteParticipantRequest;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private contractService: ContractsService,) {}

  ngOnInit(): void {
    let contractId: number = this.getContractIdFromRouteParam();
    let detailedContractRequest = this.getDetailedContractRequest(contractId);
    
    this.loadDetailedContractData(detailedContractRequest);  

    this.prepareForm();
  }

  inviteParticipant(): void {
    console.log(`Dados enviados para o back: ${this.form.value}`)

    this.inviteParticipantRequest = new InviteParticipantRequest();
    this.inviteParticipantRequest.contractId = this.getContractIdFromRouteParam();
    this.inviteParticipantRequest.email = this.form.value['email'];
    this.inviteParticipantRequest.participantRole = this.form.value['participantRole'];

    this.contractService.inviteParticipant(this.inviteParticipantRequest)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );
  }

  removeParticipant(accountId: number): void{
    let removeParticipantRequest = new RemoveParticipantRequest();
    removeParticipantRequest.contractId = this.getContractIdFromRouteParam();
    removeParticipantRequest.accountId = accountId;

    this.contractService.removeParticipant(removeParticipantRequest)
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  //#region Private helper methods
  private getContractIdFromRouteParam(): number{
    let contractId!: number;

    this.activatedRoute.params.subscribe(paramsId => {
      contractId = paramsId.contractId;
    });

    return contractId;
  }

  private getDetailedContractRequest(contractId: number): DetailedContractRequest{
    let detailedContractRequest = new DetailedContractRequest();
    detailedContractRequest.contractId =contractId;

    return detailedContractRequest;
  }

  private loadDetailedContractData(detailedContractRequest: DetailedContractRequest): void{
    this.contractService.getContractDetailed(detailedContractRequest)
    .subscribe(
      (data: DetailedContractResponse) => {
        this.detailedContractResponse = data;
        console.log(data);
      },
      (error) => console.log(error));
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
  //#endregion
}
