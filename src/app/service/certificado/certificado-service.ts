import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
	private url ="api/certificados";

	constructor(private http: HttpClient){}

	get(): Observable<any> {
		return this.http.get(this.url);
	}

	getByEvento(eventoId: number): Observable<any> {
		return this.http.get(this.url + `?eventoId=${eventoId}`);
	}
}
