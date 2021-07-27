export class CorporationDetailedResponse {
    public id!: number;
    public name!: string;
    public admin!: string;
    public createDate!: Date;
    public participants!: Participant[];
    public monthlyBalances!: MonthlyBalance[];
}

export class Participant {
    public fullName!: string;
    public invitationStatus!: string;
    public sharedPercetage!: number;
}

export class MonthlyBalance {
    public month!: Date;
    public totalProfit!: number;
}