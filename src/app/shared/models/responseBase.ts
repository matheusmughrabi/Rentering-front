export class ResponseBase<T>{
    public success!: boolean;
    public message!: string;
    public data!: T;
}