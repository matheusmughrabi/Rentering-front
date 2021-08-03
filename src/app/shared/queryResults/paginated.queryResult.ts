import { ListQueryResult } from "./list.queryResult";

export class PaginatedQueryResult<TData> extends ListQueryResult<TData>{
    public pagination!: PaginationResult;
}

export class PaginationResult{
    public page!: number;
    public recordsPerPage!: number;
    public totalRecords!: number;
}