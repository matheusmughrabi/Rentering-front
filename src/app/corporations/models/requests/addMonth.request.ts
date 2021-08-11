export class AddMonthRequest{
    constructor(corporationId: number, startDate: Date, endDate: Date) {
        this.corporationId = corporationId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public corporationId!: number;
    public startDate!: Date;
    public endDate!: Date;
}