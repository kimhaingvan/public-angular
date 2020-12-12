export interface GetItemsByPageRsp {
    has_next: boolean,
    has_prev: boolean,
    items: any[],
    current_page: Number,
}