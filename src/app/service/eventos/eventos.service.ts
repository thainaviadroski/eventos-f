import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Evento, EventoPayload } from '../../models/evento.model';
import { ApiPage, PageResponse, PaginationParams } from '../../models/pagination.model';
import { buildPaginationParams, toPageResponse } from '../../shared/utils/pagination.util';

@Injectable({
	providedIn: 'root',
})
export class EventosService {

	private url = 'api/eventos';

	constructor(private http: HttpClient) { }

	get(params: PaginationParams = {}): Observable<PageResponse<Evento>> {
		const httpParams = buildPaginationParams(params);

		return this.http.get<ApiPage<Evento>>(this.url, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	search(q: string, params: PaginationParams = {}): Observable<PageResponse<Evento>> {
		const httpParams = buildPaginationParams(params).set('q', q);

		return this.http.get<ApiPage<Evento>>(`${this.url}/search`, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	find(id: number): Observable<Evento> {
		return this.http.get<Evento>(`${this.url}/${id}`);
	}

	create(evento: EventoPayload): Observable<Evento> {
		return this.http.post<Evento>(this.url, evento);
	}

	update(id: number, evento: EventoPayload): Observable<Evento> {
		return this.http.put<Evento>(`${this.url}/${id}`, evento);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.url}/${id}`);
	}
}
