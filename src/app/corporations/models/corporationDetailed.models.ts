export class CorporationDetailedResponse {
    public id!: number;
    public name!: string;
    public admin!: string;
    public createDate!: Date;
    public status!: string;
    public participants!: Participant[];
    public monthlyBalances!: MonthlyBalance[];
}

export class Participant {
    public fullName!: string;
    public invitationStatus!: string;
    public sharedPercentage!: number;
}

export class MonthlyBalance {
    public id!: number;
    public month!: Date;
    public totalProfit!: number;
    public participantBalances!: ParticipantBalance[];
}

export class ParticipantBalance{
    public participantName!: string;
    public balance!: number;
}