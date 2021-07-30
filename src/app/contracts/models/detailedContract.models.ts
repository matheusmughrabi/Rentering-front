import { EnumResult } from "src/app/shared/enums/enumResult.model";

export class DetailedContractRequest {
    public contractId!: number;
}

export class DetailedContractResponse {
    public id!: number;
    public contractName!: string;
    public currentUserRole!: EnumResult;
    public contractState!: EnumResult;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
    public participants!: Participant[];
    public contractPayments!: ContractPayment[];
}

export class Participant {
    public accountId!: number;
    public fullName!: string;
    public participantRole!: EnumResult;
    public status!: EnumResult;
}

export class ContractPayment {
    public month!: Date;
    public rentPrice!: number;
    public receiverPaymentStatus!: EnumResult;
    public payerPaymentStatus!: EnumResult;
}