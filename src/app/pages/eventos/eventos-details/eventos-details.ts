import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
	selector: 'app-eventos-details',
	imports: [DatePipe, MatIcon],
	templateUrl: './eventos-details.html',
	styleUrl: './eventos-details.css',
})
export class EventosDetails {

	evento = {
		id: 1,
		nome: 'Evento 1',
		dtInicio: '2024-07-01',
		dtFim: '2024-07-02',
		descricao: 'Descrição do Evento 1'
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
