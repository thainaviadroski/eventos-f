import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AcademicoCertificado, AcademicoManualPayload } from '../../models/academico-certificado.model';

@Injectable({
	providedIn: 'root',
})
export class AcademicoCertificadoService {
	private url = 'api/academico-certificado';

	constructor(private http: HttpClient) { }

	importCsv(certificadoId: number, arquivo: File): Observable<AcademicoCertificado[]> {
		const formData = new FormData();
		formData.append('certificadoId', certificadoId.toString());
		formData.append('file', arquivo);

		return this.http.post<AcademicoCertificado[]>(`${this.url}/import`, formData);
	}

	importManual(payload: AcademicoManualPayload): Observable<AcademicoCertificado> {
		return this.http.post<AcademicoCertificado>(`${this.url}/import/manual`, payload);
	}
}
