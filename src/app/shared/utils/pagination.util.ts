import { HttpParams } from '@angular/common/http';

import { ApiPage, PageResponse, PaginationParams } from '../../models/pagination.model';

export function buildPaginationParams(params: PaginationParams = {}): HttpParams {
	const { page = 0, size = 10, sort, direction = 'asc' } = params;

	let httpParams = new HttpParams()
		.set('page', page.toString())
		.set('size', size.toString());

	if (sort) {
		httpParams = httpParams.set('sort', `${sort},${direction}`);
	}

	return httpParams;
}

export function toPageResponse<T>(body: ApiPage<T>, fallback: PaginationParams = {}): PageResponse<T> {
	const { page = 0, size = 10 } = fallback;

	return {
		content: body.content ?? [],
		totalElements: body.page?.totalElements ?? 0,
		totalPages: body.page?.totalPages ?? 0,
		size: body.page?.size ?? size,
		number: body.page?.number ?? page,
		first: (body.page?.number ?? page) === 0,
		last: (body.page?.number ?? page) >= (body.page?.totalPages ?? 1) - 1,
		empty: (body.content?.length ?? 0) === 0,
	};
}

/**
 * Alguns endpoints (ex.: /certificados/evento/{eventoId}) retornam um array simples,
 * sem paginação no backend. Esta função pagina o array no cliente para manter o
 * mesmo contrato (PageResponse) usado pelos endpoints paginados.
 */
export function toPageResponseFromArray<T>(items: T[], params: PaginationParams = {}): PageResponse<T> {
	const { page = 0, size = 10 } = params;
	const totalElements = items.length;
	const totalPages = size > 0 ? Math.ceil(totalElements / size) : 0;
	const content = items.slice(page * size, page * size + size);

	return {
		content,
		totalElements,
		totalPages,
		size,
		number: page,
		first: page === 0,
		last: page >= totalPages - 1,
		empty: content.length === 0,
	};
}
