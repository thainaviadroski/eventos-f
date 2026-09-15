import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AcademicoItensComponent } from '../../components/academico-itens-component/academico-itens-component';
import { Academico } from '../../models/academico.model';
import { AcademicoService } from '../../service/academico/academico.service';
import { PAGES_SIZE_OPTIONS } from '../../shared/utils/Constraints';

@Component({
	selector: 'app-academicos',
	imports: [AcademicoItensComponent, MatPaginatorModule],
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

	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.carregarAcademicos();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	carregarAcademicos(): void {
		this.service.get({ page: this.page, size: this.size })
			.pipe(takeUntil(this.destroy$))
			.subscribe(response => {
				this.academicos = response.content;
				this.totalElements = response.totalElements;
			});
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
