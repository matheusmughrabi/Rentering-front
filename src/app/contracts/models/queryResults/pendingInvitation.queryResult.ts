import { EnumResult } from "src/app/shared/enums/enumResult.model";

export class PendingInvitationQueryResult{
    public accountContractId!: number;
    public contractId!: number;
    public contractName!: string;
    public contractOwner!: string;
    public contractState!: EnumResult;
    public participantRole!: string;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
}