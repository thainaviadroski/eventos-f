import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CertificadoImagem } from '../../models/certificado-imagem.model';

@Injectable({
	providedIn: 'root',
})
export class CertificadoImagensService {
	private url = 'api/certficado-imagens';

	constructor(private http: HttpClient) { }

	findByCertificado(certificadoId: number): Observable<CertificadoImagem[]> {
		return this.http.get<CertificadoImagem[]>(`${this.url}/certificado/${certificadoId}`);
	}

	loadImage(imagemId: number): Observable<Blob> {
		return this.http.get(`${this.url}/${imagemId}`, { responseType: 'blob' });
	}

	updateFundo(imagemId: number, arquivo: File): Observable<void> {
		const formData = new FormData();
		formData.append('fundo', arquivo);

		return this.http.put<void>(`${this.url}/${imagemId}`, formData);
	}

	updateVerso(imagemId: number, arquivo: File): Observable<void> {
		const formData = new FormData();
		formData.append('verso', arquivo);

		return this.http.put<void>(`${this.url}/${imagemId}/verso`, formData);
	}

	addVerso(certificadoId: number, arquivo: File): Observable<void> {
		const formData = new FormData();
		formData.append('file', arquivo);

		return this.http.post<void>(`${this.url}/verso/${certificadoId}`, formData);
	}
}
