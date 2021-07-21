export class RegisterRequest{
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public confirmPassword!: string;
}

export class RegisterResponse{
    public id!: number;
    public username!: string;
    public role!: string;
    public token!: string;
}