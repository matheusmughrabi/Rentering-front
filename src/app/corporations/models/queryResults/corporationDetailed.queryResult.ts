import { EnumResult } from "src/app/shared/enums/enumResult.model";

export class CorporationDetailedQueryResult {
    public id!: number;
    public name!: string;
    public admin!: string;
    public isCurrentUserAdmin!: boolean;
    public createDate!: Date;
    public status!: EnumResult;
    public participants!: Participant[];
    public monthlyBalances!: MonthlyBalance[];
}

export class Participant {
    public fullName!: string;
    public invitationStatus!: EnumResult;
    public sharedPercentage!: number;
}

export class MonthlyBalance {
    public id!: number;
    public month!: Date;
    public totalProfit!: number;
    public status!: EnumResult;
    public currentUserBalanceStatus!: EnumResult;
    public participantBalances!: ParticipantBalance[];
}

export class ParticipantBalance{
    public participantName!: string;
    public balance!: number;
    public status!: EnumResult;
    public description!: string;
}