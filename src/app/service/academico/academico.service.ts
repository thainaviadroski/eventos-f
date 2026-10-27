import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Academico } from '../../models/academico.model';
import { ApiPage, PageResponse, PaginationParams } from '../../models/pagination.model';
import { buildPaginationParams, toPageResponse } from '../../shared/utils/pagination.util';

@Injectable({
	providedIn: 'root',
})
export class AcademicoService {
	private url = 'api/academico';

	constructor(private http: HttpClient) { }

	get(params: PaginationParams = {}): Observable<PageResponse<Academico>> {
		const httpParams = buildPaginationParams(params);

		return this.http.get<ApiPage<Academico>>(this.url, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	search(q: string, params: PaginationParams = {}): Observable<PageResponse<Academico>> {
		const httpParams = buildPaginationParams(params).set('q', q);

		return this.http.get<ApiPage<Academico>>(`${this.url}/search`, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	find(id: number): Observable<Academico> {
		return this.http.get<Academico>(`${this.url}/${id}`);
	}
}
