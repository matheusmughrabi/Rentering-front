export class AddMonthRequest{
    constructor(corporationId: number, totalProfit: number) {
        this.corporationId = corporationId;
        this.totalProfit = totalProfit;
    }

    public corporationId!: number;
    public totalProfit!: number;
}