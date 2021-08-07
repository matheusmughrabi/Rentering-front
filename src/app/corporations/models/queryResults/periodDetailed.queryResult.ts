export class PeriodDetailedQueryResult {
    public id!: number;
    public startDate!: Date;
    public endDate!: number;
    public totalProfit!: number;
    public participantBalances!: GetPeriodParticipantBalance[];
    public incomes!: GetPeriodIncome[];
}

export class GetPeriodParticipantBalance {
    public fullName!: string;
    public balance!: number;
}

export class GetPeriodIncome {
    public title!: string;
    public description!: string;
    public value!: number;
}