import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CertificadoService {
	private url = "api/certificados";

	constructor(private http: HttpClient) { }

	get(): Observable<any> {
		return this.http.get(this.url);
	}

	getByEvento(eventoId: number, params: PaginationParams = {}): Observable<PageResponse<any>> {
		const { page = 1, size = 10, sort, direction = 'asc' } = params;

		let httpParams = new HttpParams()
			.set('_page', page.toString())
			.set('_per_page', size.toString());

		if (sort) {
			httpParams = httpParams
				.set('_sort', sort)
				.set('_order', direction);
		}


		return this.http.get<JsonServerPage<any>>(this.url + `?eventoId=${eventoId}`, { params: httpParams }).pipe(
			map(body => {
				console.log('Resposta bruta do servidor:', body);
				return {
					content: body.data ?? [],
					totalElements: body.items ?? 0,
					totalPages: body.pages ?? 0,
					size,
					number: page - 1,
					first: body.prev === null,
					last: body.next === null,
					empty: body.data?.length === 0,
				} as PageResponse<any>;
			})

		);
	}
}


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

interface JsonServerPage<T> {
	data: T[];
	items: number;
	pages: number;
	next: number | null;
	prev: number | 0 | null;
}
