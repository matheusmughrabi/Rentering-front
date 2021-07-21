export class UserContractResponse{
    public id!: number;
    public contractName!: string;
    public contractState!: string;
    public participantRole!: string;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
}