import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-eventos-details',
	imports: [DatePipe, MatIcon],
	templateUrl: './eventos-details.html',
	styleUrl: './eventos-details.css',
})
export class EventosDetails {

	evento: any
	constructor(private route: ActivatedRoute, private router: Router) {
		this.evento = this.route.snapshot.data['evento'];
	}

	certificados = [
		{
			id: 1,
			nome: 'Certificado 1',
			dtEmissao: '2024-07-03',
			tipo: 'Participante',
			descricao: 'Descrição do Certificado 1'
		}, {
			id: 2,
			nome: 'Certificado 2',
			dtEmissao: '2024-08-03',
			tipo: 'Palestrante',
			descricao: 'Descrição do Certificado 2'
		}
	]
}
