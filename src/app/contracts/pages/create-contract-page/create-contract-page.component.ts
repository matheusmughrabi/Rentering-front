import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { ContractsService } from 'src/app/contracts/services/contracts.service';

@Component({
  selector: 'app-create-contract-page',
  templateUrl: './create-contract-page.component.html'
})
export class CreateContractPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private contractsService: ContractsService) {
    this.form = this.formBuilder.group({
      contractName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],

      rentPrice: ['', Validators.compose([
        Validators.required
      ])],

      rentDueDate: ['', Validators.compose([
        Validators.required
      ])],

      contractStartDate: ['', Validators.compose([
        Validators.required
      ])],

      contractEndDate: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {
  }

  createContract(): void {
    this.contractsService.createContract(this.form.value)
      .subscribe(
        (data: ResponseBase<any>) => {
          console.log(data);
        },
        (error) => console.log(error)
        );
  }
}
