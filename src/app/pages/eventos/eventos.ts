import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, filter, map, Subject, Subscription, takeUntil } from 'rxjs';
import { EventosItensComponent } from '../../components/eventos-itens-component/eventos-itens-component';
import { EventosService } from '../../service/eventos/eventos.service';
import { EventosDialog, EventosDialogData } from '../../components/eventos-dialog/eventos-dialog';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { Evento } from '../../models/evento.model';

import { PAGES_SIZE_OPTIONS } from '../../shared/utils/Constraints';

@Component({
	selector: 'app-eventos',
	imports: [
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		EventosItensComponent,
		MatPaginatorModule,
	],
	templateUrl: './eventos.html',
	styleUrl: './eventos.css',
})
export class Eventos implements OnInit, OnDestroy {

	private route = inject(Router);
	private service = inject(EventosService);

	readonly dialog = inject(MatDialog);

	page = 0;
	size = 10;
	eventos: any[] = [];
	totalElements = 0;

	readonly pageSizeOptions: number[] = PAGES_SIZE_OPTIONS;

	readonly busca = new FormControl('', { nonNullable: true });
	termo = '';

	private carregamento?: Subscription;
	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.busca.valueChanges
			.pipe(
				map(valor => valor.trim()),
				debounceTime(300),
				filter(termo => termo !== this.termo),
				takeUntil(this.destroy$)
			)
			.subscribe(termo => {
				this.termo = termo;
				this.page = 0;
				this.carregarEventos();
			});

		this.carregarEventos();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	carregarEventos(): void {
		const params = { page: this.page, size: this.size };
		const request$ = this.termo ? this.service.search(this.termo, params) : this.service.get(params);

		// Cancela a requisição anterior para uma resposta atrasada não sobrescrever a busca atual
		this.carregamento?.unsubscribe();
		this.carregamento = request$
			.pipe(takeUntil(this.destroy$))
			.subscribe(response => {
				this.eventos = response.content;
				this.totalElements = response.totalElements;
			});
	}

	limparBusca(): void {
		this.busca.setValue('');
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex;
		this.size = event.pageSize;
		this.carregarEventos();
	}

	onDetail(eventoId: number): void {
		this.route.navigateByUrl(`eventos/${eventoId}/detail`);
	}


	openDialog(evento?: Evento) {
		const data: EventosDialogData = { evento };

		this.dialog.open(EventosDialog, {
			width: '100%',
			maxWidth: '1000px',
			height: '500px',
			data,
		}).afterClosed().subscribe(result => {
			if (result) {
				this.carregarEventos();
			}
		});
	}

	onDelete(evento: Evento): void {
		const data: ConfirmDialogData = {
			titulo: 'Excluir Evento',
			mensagem: `Deseja realmente excluir o evento "${evento.evento}"? Esta ação não poderá ser desfeita.`,
			textoConfirmar: 'Excluir',
			mensagemSucesso: `O evento "${evento.evento}" foi excluído com sucesso.`,
			acao: () => this.service.delete(evento.id),
		};

		this.dialog.open(ConfirmDialog, {
			width: '100%',
			maxWidth: '480px',
			data,
		}).afterClosed().subscribe(excluido => {
			if (excluido) {
				// Se era o último item da página, volta uma página para não exibir uma lista vazia
				if (this.eventos.length === 1 && this.page > 0) {
					this.page--;
				}
				this.carregarEventos();
			}
		});
	}
}
