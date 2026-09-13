import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Certificado, CertificadoPayload } from '../../models/certificado.model';
import { PageResponse, PaginationParams } from '../../models/pagination.model';
import { toPageResponseFromArray } from '../../shared/utils/pagination.util';

@Injectable({
	providedIn: 'root',
})
export class CertificadoService {
	private url = "api/certificados";

	constructor(private http: HttpClient) { }

	get(): Observable<Certificado[]> {
		return this.http.get<Certificado[]>(this.url);
	}

	find(id: number): Observable<Certificado> {
		return this.http.get<Certificado>(`${this.url}/${id}`);
	}

	getByEvento(eventoId: number, params: PaginationParams = {}): Observable<PageResponse<Certificado>> {
		// GET /certificados/evento/{eventoId} não é paginado no backend (retorna um array simples),
		// diferente de GET /certificados (que retorna ApiPage). Paginamos no cliente.
		return this.http.get<Certificado[]>(`${this.url}/evento/${eventoId}`)
			.pipe(
				map(certificados => toPageResponseFromArray(certificados, params))
			);
	}

	create(certificado: CertificadoPayload, imagem?: File | null): Observable<Certificado> {
		return this.http.post<Certificado>(this.url, this.toFormData(certificado, imagem));
	}

	update(id: number, certificado: CertificadoPayload, imagem?: File | null): Observable<Certificado> {
		return this.http.put<Certificado>(`${this.url}/${id}`, this.toFormData(certificado, imagem));
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.url}/${id}`);
	}

	private toFormData(certificado: CertificadoPayload, imagem?: File | null): FormData {
		const formData = new FormData();
		formData.append('certificado', new Blob([JSON.stringify(certificado)], { type: 'application/json' }));

		if (imagem) {
			formData.append('fundo', imagem);
		}

		return formData;
	}
}
