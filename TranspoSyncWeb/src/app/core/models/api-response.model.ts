export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    statusCode: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    totalCount: number;
    pageSize: number;
    currentPage: number;
}
