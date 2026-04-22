export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

// interface PaginationOptions {
// 	page?: number;
// 	pageSize?: number;
// 	cache?: boolean;
// }
