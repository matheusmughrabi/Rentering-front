export class AcceptBalanceRequest{
    constructor(corporationId: number, monthlyBalanceId: number) {
        this.corporationId = corporationId;
        this.monthlyBalanceId = monthlyBalanceId;
    }

    public corporationId!: number;
    public monthlyBalanceId!: number;
}