export class LoginRequest{
    public username!: String;
    public password!: String;
}

export class LoginResponse{
    public id!: number;
    public username!: string;
    public role!: string;
    public token!: string;
}