import { EnumResult } from "src/app/shared/enums/enumResult.model";

export class LicenseDetailsQueryResult {
    public id!: number;
    public license!: EnumResult;
    public price!: number;
} 