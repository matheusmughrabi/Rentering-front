export class RegisterIncomeRequest{
    constructor(corporationId: number, monthlyBalanceId: number, title: string, description: string, value: number) {
        this.corporationId = corporationId;
        this.monthlyBalanceId = monthlyBalanceId;
        this.title = title;
        this.description = description;
        this.value = value;
    }

    public corporationId!: number;
    public monthlyBalanceId!: number;
    public title!: string;
    public description!: string;
    public value!: number;
}