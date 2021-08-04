export class AddMonthRequest{
    constructor(corporationId: number, month: Date, totalProfit: number) {
        this.corporationId = corporationId;
        this.month = month;
        this.totalProfit = totalProfit;
    }

    public corporationId!: number;
    public month!: Date;
    public totalProfit!: number;
}