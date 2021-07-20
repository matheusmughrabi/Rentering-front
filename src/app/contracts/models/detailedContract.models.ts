export class DetailedContractRequest {
    public contractId!: number;
}

export class DetailedContractResponse {
    public id!: number;
    public contractName!: string;
    public contractState!: string;
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
    public participantRole!: string;
    public status!: number;
}

export class ContractPayment {
    public month!: Date;
    public rentPrice!: number;
    public receiverPaymentStatus!: string;
    public payerPaymentStatus!: string;
}