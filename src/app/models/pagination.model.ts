export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string;
	direction?: 'asc' | 'desc';
}

export interface PageResponse<T> {
	content: T[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}

export interface ApiPage<T> {
	content: T[];
	page: {
		size: number;
		number: number;
		totalElements: number;
		totalPages: number;
	};
}
