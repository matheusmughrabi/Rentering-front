export class ResponseBase<T>{
    public success!: boolean;
    public message!: string;
    public notifications!: Notification[];
    public data!: T;
}

export class Notification{
    public title!: string;
    public message!: string;
}