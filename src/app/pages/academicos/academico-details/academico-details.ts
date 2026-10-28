import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';

import { Academico } from '../../../models/academico.model';
import { AcademicoCertificado } from '../../../models/academico-certificado.model';
import { Certificado } from '../../../models/certificado.model';
import { AcademicoCertificadoService } from '../../../service/academico-certificado/academico-certificado.service';
import { CertificadoService } from '../../../service/certificado/certificado.service';
import { PAGES_SIZE_OPTIONS } from '../../../shared/utils/Constraints';

/** Vínculo acadêmico-certificado com os dados do certificado (o endpoint retorna apenas o certificadoId). */
export interface CertificadoDoAcademico extends AcademicoCertificado {
	certificado: Certificado | null;
}

@Component({
	selector: 'app-academico-details',
	imports: [DatePipe, MatIconModule, MatPaginatorModule, MatTooltipModule],
	templateUrl: './academico-details.html',
	styleUrl: './academico-details.css',
})
export class AcademicoDetails implements OnInit, OnDestroy {

	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly academicoCertificadoService = inject(AcademicoCertificadoService);
	private readonly certificadoService = inject(CertificadoService);

	academico: Academico = this.route.snapshot.data['academico'];

	page = 0;
	size = 5;
	certificados: CertificadoDoAcademico[] = [];
	totalElements = 0;
	carregando = false;

	readonly pageSizeOptions: number[] = PAGES_SIZE_OPTIONS;

	toolTipOptions = {
		showDelay: 300,
		hideDelay: 2000
	};

	private carregamento?: Subscription;
	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.carregarCertificados();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	carregarCertificados(): void {
		this.carregando = true;

		// Cancela a requisição anterior para uma resposta atrasada não sobrescrever a página atual
		this.carregamento?.unsubscribe();
		this.carregamento = this.academicoCertificadoService
			.getByAcademico(this.academico.id, { page: this.page, size: this.size })
			.pipe(
				switchMap(response => this.comCertificados(response.content).pipe(
					map(certificados => ({ certificados, totalElements: response.totalElements }))
				)),
				takeUntil(this.destroy$)
			)
			.subscribe({
				next: ({ certificados, totalElements }) => {
					this.certificados = certificados;
					this.totalElements = totalElements;
					this.carregando = false;
				},
				error: () => this.carregando = false,
			});
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex;
		this.size = event.pageSize;
		this.carregarCertificados();
	}

	onViewCertificado(item: CertificadoDoAcademico): void {
		if (!item.certificado) {
			return;
		}
		this.router.navigateByUrl(`eventos/${item.certificado.eventoId}/certificados/${item.certificadoId}`);
	}

	private comCertificados(vinculos: AcademicoCertificado[]): Observable<CertificadoDoAcademico[]> {
		if (vinculos.length === 0) {
			return of([]);
		}

		return forkJoin(vinculos.map(vinculo =>
			this.certificadoService.find(vinculo.certificadoId).pipe(
				catchError(() => of(null)),
				map(certificado => ({ ...vinculo, certificado }))
			)
		));
	}
}
