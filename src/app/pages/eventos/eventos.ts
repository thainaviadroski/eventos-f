import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventosItensComponent } from '../../components/eventos-itens-component/eventos-itens-component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-eventos',
	imports: [MatIconModule, MatButtonModule, EventosItensComponent],
	templateUrl: './eventos.html',
	styleUrl: './eventos.css',
})
export class Eventos {


	private route: Router = inject(Router);

	eventos = [
		{
			id: 1,
			nome: 'Evento 1',
			dtInicio: '2024-07-01',
			dtFim: '2024-07-02',
			descricao: 'Descrição do Evento 1'
		}, {
			id: 2,
			nome: 'Evento 2',
			dtInicio: '2024-08-01',
			dtFim: '2024-08-02',
			descricao: 'Descrição do Evento 2'
		}
	];

	onDetail(eventoId: number) {
		console.info("Chamou o detalhe do evento com id: ", eventoId);
		this.route.navigateByUrl(`eventos/${eventoId}/detail`);
	}

}
