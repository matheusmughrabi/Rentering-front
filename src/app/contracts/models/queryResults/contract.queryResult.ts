import { EnumResult } from "src/app/shared/enums/enumResult.model";

export class UserContractQueryResult{
    public id!: number;
    public contractName!: string;
    public contractState!: EnumResult;
    public participantRole!: EnumResult;
    public rentPrice!: number;
    public rentDueDate!: Date;
    public contractStartDate!: Date;
    public contractEndDate!: Date;
}