import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AcademicoCertificado, AcademicoManualPayload } from '../../models/academico-certificado.model';
import { ApiPage, PageResponse, PaginationParams } from '../../models/pagination.model';
import { buildPaginationParams, toPageResponse } from '../../shared/utils/pagination.util';

@Injectable({
	providedIn: 'root',
})
export class AcademicoCertificadoService {
	private url = 'api/academico-certificado';

	constructor(private http: HttpClient) { }

	getByAcademico(academicoId: number, params: PaginationParams = {}): Observable<PageResponse<AcademicoCertificado>> {
		const httpParams = buildPaginationParams(params);

		return this.http.get<ApiPage<AcademicoCertificado>>(`${this.url}/academico/${academicoId}`, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	getByCertificado(certificadoId: number, params: PaginationParams = {}): Observable<PageResponse<AcademicoCertificado>> {
		const httpParams = buildPaginationParams(params);

		return this.http.get<ApiPage<AcademicoCertificado>>(`${this.url}/certificado/${certificadoId}`, { params: httpParams }).pipe(
			map(body => toPageResponse(body, params))
		);
	}

	importCsv(certificadoId: number, arquivo: File): Observable<AcademicoCertificado[]> {
		const formData = new FormData();
		formData.append('certificadoId', certificadoId.toString());
		formData.append('file', arquivo);

		return this.http.post<AcademicoCertificado[]>(`${this.url}/import`, formData);
	}

	importManual(payload: AcademicoManualPayload): Observable<AcademicoCertificado> {
		return this.http.post<AcademicoCertificado>(`${this.url}/import/manual`, payload);
	}

	remove(certificadoId: number, academicoId: number): Observable<void> {
		return this.http.delete<void>(`${this.url}/certificado/${certificadoId}/academico/${academicoId}`);
	}
}
