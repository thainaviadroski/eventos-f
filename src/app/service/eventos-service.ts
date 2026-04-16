import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventosService {

	private url = "/api/eventos";

	constructor(private http: HttpClient) { }


	/* TODO:
	 - Criar todas as tipagens dos nos Eventos
	 */


	get(): Observable<any> {
		return this.http.get(this.url);
	}

	find(id: number): Observable<any> {
		return this.http.get(this.url + `/${id}`);
	}
}
