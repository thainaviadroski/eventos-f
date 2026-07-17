import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventosItensComponent } from '../../components/eventos-itens-component/eventos-itens-component';
import { EventosService } from '../../service/eventos/eventos.service';
import { EventosDialog } from '../../components/eventos-dialog/eventos-dialog';

import { PAGES_SIZE_OPTIONS } from '../../shared/utils/Constraints';

@Component({
	selector: 'app-eventos',
	imports: [MatIconModule, MatButtonModule, EventosItensComponent, MatPaginatorModule],
	templateUrl: './eventos.html',
	styleUrl: './eventos.css',
})
export class Eventos implements OnInit, OnDestroy {

	private route = inject(Router);
	private service = inject(EventosService);

	readonly dialog = inject(MatDialog);

	page = 1;
	size = 10;
	eventos: any[] = [];
	totalElements = 0;

	readonly pageSizeOptions: number[] = PAGES_SIZE_OPTIONS;

	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.carregarEventos();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	carregarEventos(): void {
		this.service.get({ page: this.page, size: this.size })
			.pipe(takeUntil(this.destroy$))
			.subscribe(response => {
				console.log(response);
				this.eventos = response.content;
				this.totalElements = response.totalElements;
			});
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex + 1; // mat-paginator começa em 0, JSON Server em 1
		this.size = event.pageSize;
		this.carregarEventos();
	}

	onDetail(eventoId: number): void {
		this.route.navigateByUrl(`eventos/${eventoId}/detail`);
	}


	openDialog() {
		this.dialog.open(EventosDialog, {
			width: '100%',
			maxWidth: '1000px',
			height: '500px'
		});
	}
}
