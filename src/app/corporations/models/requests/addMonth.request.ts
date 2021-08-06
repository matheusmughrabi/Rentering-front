export class AddMonthRequest{
    constructor(corporationId: number, startDate: Date, endDate: Date, totalProfit: number) {
        this.corporationId = corporationId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalProfit = totalProfit;
    }

    public corporationId!: number;
    public startDate!: Date;
    public endDate!: Date;
    public totalProfit!: number;
}