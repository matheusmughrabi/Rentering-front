export class AddParticipantDescriptionToMonth{
    constructor(corporationId: number, monthlyBalanceId: number, description: string) {
        this.corporationId = corporationId;
        this.monthlyBalanceId = monthlyBalanceId;
        this.description = description;
    }

    public corporationId!: number;
    public monthlyBalanceId!: number;
    public description!: string;
}