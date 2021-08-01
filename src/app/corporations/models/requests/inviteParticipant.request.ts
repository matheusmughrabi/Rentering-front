export class InviteToCorporationRequest{
    constructor(corporationId: number, email: string, sharedPercentage: number) {
        this.corporationId = corporationId;
        this.email = email;
        this.sharedPercentage = sharedPercentage;
    }

    public corporationId!: number;
    public email!: string;
    public sharedPercentage!: number;
}