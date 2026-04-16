import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EventosItensComponent } from '../../components/eventos-itens-component/eventos-itens-component';
import { EventosService } from '../../service/eventos/eventos-service';

@Component({
	selector: 'app-eventos',
	imports: [MatIconModule, MatButtonModule, EventosItensComponent],
	templateUrl: './eventos.html',
	styleUrl: './eventos.css',
})
export class Eventos implements OnInit {

	private route: Router = inject(Router);
	private service = inject(EventosService);

	eventos: any[] = [];

	ngOnInit(): void {
		this.service.get()
			.pipe(take(1))
			.subscribe((data) => {
				console.info(data)
				this.eventos = data;
			});
	}


	onDetail(eventoId: number) {
		console.info("Chamou o detalhe do evento com id: ", eventoId);
		this.route.navigateByUrl(`eventos/${eventoId}/detail`);
	}

}
