import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, filter, map, Subject, Subscription, takeUntil } from 'rxjs';

import { AcademicoItensComponent } from '../../components/academico-itens-component/academico-itens-component';
import { Academico } from '../../models/academico.model';
import { AcademicoService } from '../../service/academico/academico.service';
import { PAGES_SIZE_OPTIONS } from '../../shared/utils/Constraints';

@Component({
	selector: 'app-academicos',
	imports: [
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		AcademicoItensComponent,
		MatPaginatorModule,
	],
	templateUrl: './academicos.html',
	styleUrl: './academicos.css',
})
export class Academicos implements OnInit, OnDestroy {

	private router = inject(Router);
	private service = inject(AcademicoService);

	page = 0;
	size = 10;
	academicos: Academico[] = [];
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
				this.carregarAcademicos();
			});

		this.carregarAcademicos();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	carregarAcademicos(): void {
		const params = { page: this.page, size: this.size };
		const request$ = this.termo ? this.service.search(this.termo, params) : this.service.get(params);

		// Cancela a requisição anterior para uma resposta atrasada não sobrescrever a busca atual
		this.carregamento?.unsubscribe();
		this.carregamento = request$
			.pipe(takeUntil(this.destroy$))
			.subscribe(response => {
				this.academicos = response.content;
				this.totalElements = response.totalElements;
			});
	}

	limparBusca(): void {
		this.busca.setValue('');
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex;
		this.size = event.pageSize;
		this.carregarAcademicos();
	}

	onDetail(academicoId: number): void {
		this.router.navigateByUrl(`academicos/${academicoId}/detail`);
	}
}
