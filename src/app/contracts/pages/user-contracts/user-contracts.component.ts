import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/contracts/services/contracts.service';
import { UserContractResponse } from '../../models/contract.models';

@Component({
  selector: 'app-user-contracts',
  templateUrl: './user-contracts.component.html'
})
export class UserContractsComponent implements OnInit {
  public userContracts!: UserContractResponse[];
  
  constructor(private contractService: ContractsService) { }

  ngOnInit(): void {
    this.contractService.getContractsOfUser()
      .subscribe(
        (data: UserContractResponse[]) => this.userContracts = data);
  }

}
