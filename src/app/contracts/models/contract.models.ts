export class UserContractResponse{
    public id!: number;
    public contractName!: string;
    public contractState!: number;
    public participantRole!: number;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
}