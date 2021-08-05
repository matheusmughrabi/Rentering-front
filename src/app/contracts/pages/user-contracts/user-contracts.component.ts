import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/contracts/services/contracts.service';
import { UserContractQueryResult } from '../../models/queryResults/contract.queryResult';

@Component({
  selector: 'app-user-contracts',
  templateUrl: './user-contracts.component.html'
})
export class UserContractsComponent implements OnInit {
  public userContracts!: UserContractQueryResult[];
  
  constructor(private contractService: ContractsService) { }

  ngOnInit(): void {
    this.contractService.getContractsOfUser()
      .subscribe(
        (data: UserContractQueryResult[]) => this.userContracts = data);
  }

}
