export class PendingInvitationResponse{
    public accountContractId!: number;
    public contractId!: number;
    public contractName!: string;
    public contractOwner!: string;
    public contractState!: string;
    public participantRole!: string;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
}