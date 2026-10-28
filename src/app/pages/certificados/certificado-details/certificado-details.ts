import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { ConfirmDialog, ConfirmDialogData } from '../../../components/confirm-dialog/confirm-dialog';
import { CertificadoPreviewDialog } from '../../../components/certificado-preview-dialog/certificado-preview-dialog';
import { FileDropzone } from '../../../components/file-dropzone/file-dropzone';
import { AcademicoCertificado, AcademicoManualPayload } from '../../../models/academico-certificado.model';
import { Certificado } from '../../../models/certificado.model';
import { AcademicoCertificadoService } from '../../../service/academico-certificado/academico-certificado.service';
import { CertificadoImagensService } from '../../../service/certificado-imagens/certificado-imagens.service';
import { ACADEMICO_EXEMPLO_PADRAO } from '../../../shared/utils/certificado-preview.util';
import { TiposCertificadosInfo, toTiposCertificados } from '../../../shared/enums/TiposCertificados';
import { PAGES_SIZE_OPTIONS } from '../../../shared/utils/Constraints';

@Component({
	selector: 'app-certificado-details',
	imports: [
		DatePipe,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatFormField,
		MatLabel,
		MatInputModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
		FileDropzone,
	],
	templateUrl: './certificado-details.html',
	styleUrl: './certificado-details.css',
})
export class CertificadoDetails implements OnInit, OnDestroy {
	private readonly route = inject(ActivatedRoute);
	private readonly service = inject(AcademicoCertificadoService);
	private readonly imagensService = inject(CertificadoImagensService);
	private readonly dialog = inject(MatDialog);
	private readonly fb = inject(FormBuilder);

	@ViewChild('csvDropzone') private csvDropzone?: FileDropzone;
	@ViewChild('fundoDropzone') private fundoDropzone?: FileDropzone;
	@ViewChild('versoDropzone') private versoDropzone?: FileDropzone;

	certificado: Certificado = this.route.snapshot.data['certificado'];

	readonly tipoCertificaNome: string = (() => {
		const tipo = toTiposCertificados(this.certificado.tipoCertifica);
		return tipo ? TiposCertificadosInfo[tipo].name : this.certificado.tipoCertifica;
	})();

	page = 0;
	size = 25;
	academicos: AcademicoCertificado[] = [];
	totalElements = 0;
	carregandoAcademicos = false;

	readonly pageSizeOptions: number[] = PAGES_SIZE_OPTIONS;

	private carregamentoAcademicos?: Subscription;
	private destroy$ = new Subject<void>();

	csvFile: File | null = null;
	importandoCsv = false;
	csvErro: string | null = null;

	salvandoManual = false;

	readonly academicoExemplo = ACADEMICO_EXEMPLO_PADRAO;

	carregandoImagens = true;

	fundoImagemId: number | null = null;
	fundoImagem: File | null = null;
	fundoServidorUrl: string | null = null;
	private fundoObjectUrl: string | null = null;
	salvandoFundo = false;
	fundoErro: string | null = null;
	fundoSalvo = false;

	versoImagemId: number | null = null;
	versoImagem: File | null = null;
	versoServidorUrl: string | null = null;
	private versoObjectUrl: string | null = null;
	salvandoVerso = false;
	versoErro: string | null = null;
	versoSalvo = false;

	readonly form = this.fb.nonNullable.group({
		nome: ['', Validators.required],
		cpf: ['', Validators.required],
		email: ['', Validators.email],
		ra: [''],
		ch: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
	});

	ngOnInit(): void {
		this.carregarAcademicos();

		this.imagensService.findByCertificado(this.certificado.id).subscribe({
			next: imagens => {
				const fundo = imagens.find(imagem => !imagem.verso);
				const verso = imagens.find(imagem => imagem.verso);

				if (fundo) {
					this.fundoImagemId = fundo.id;
					this.carregarImagemServidor(fundo.id, url => (this.fundoServidorUrl = url));
				}

				if (verso) {
					this.versoImagemId = verso.id;
					this.carregarImagemServidor(verso.id, url => (this.versoServidorUrl = url));
				}

				this.carregandoImagens = false;
			},
			error: () => {
				this.carregandoImagens = false;
			},
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();

		if (this.fundoObjectUrl) {
			URL.revokeObjectURL(this.fundoObjectUrl);
		}
		if (this.versoObjectUrl) {
			URL.revokeObjectURL(this.versoObjectUrl);
		}
	}

	carregarAcademicos(): void {
		this.carregandoAcademicos = true;

		// Cancela a requisição anterior para uma resposta atrasada não sobrescrever a página atual
		this.carregamentoAcademicos?.unsubscribe();
		this.carregamentoAcademicos = this.service
			.getByCertificado(this.certificado.id, { page: this.page, size: this.size })
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: response => {
					this.academicos = response.content;
					this.totalElements = response.totalElements;
					this.carregandoAcademicos = false;
				},
				error: () => this.carregandoAcademicos = false,
			});
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex;
		this.size = event.pageSize;
		this.carregarAcademicos();
	}

	onCsvSelected(file: File | null): void {
		this.csvFile = file;
		this.csvErro = null;
	}

	importarCsv(): void {
		if (!this.csvFile || this.importandoCsv) {
			return;
		}

		this.importandoCsv = true;
		this.csvErro = null;

		this.service.importCsv(this.certificado.id, this.csvFile).subscribe({
			next: () => {
				this.importandoCsv = false;
				this.csvDropzone?.reset();
				this.carregarAcademicos();
			},
			error: () => {
				this.importandoCsv = false;
				this.csvErro = 'Não foi possível importar o arquivo. Verifique o formato e tente novamente.';
			},
		});
	}

	adicionarManual(): void {
		if (this.form.invalid || this.salvandoManual) {
			this.form.markAllAsTouched();
			return;
		}

		const { nome, cpf, email, ra, ch } = this.form.getRawValue();

		const payload: AcademicoManualPayload = {
			certificadoId: this.certificado.id,
			ch: ch!,
			academico: {
				academico: nome,
				cpf,
				email: email || null,
				ra: ra || null,
			},
		};

		this.salvandoManual = true;

		this.service.importManual(payload).subscribe({
			next: () => {
				this.salvandoManual = false;
				this.form.reset();
				this.carregarAcademicos();
			},
			error: () => {
				this.salvandoManual = false;
			},
		});
	}

	removerAcademico(academico: AcademicoCertificado): void {
		const data: ConfirmDialogData = {
			titulo: 'Remover Acadêmico',
			mensagem: `Deseja realmente remover "${academico.academico}" deste certificado? Esta ação não poderá ser desfeita.`,
			textoConfirmar: 'Remover',
			mensagemSucesso: `"${academico.academico}" foi removido do certificado com sucesso.`,
			acao: () => this.service.remove(this.certificado.id, academico.academicoId),
		};

		this.dialog.open(ConfirmDialog, {
			width: '100%',
			maxWidth: '480px',
			data,
		}).afterClosed().subscribe(removido => {
			if (removido) {
				// Se era o último item da página, volta uma página para não exibir uma lista vazia
				if (this.academicos.length === 1 && this.page > 0) {
					this.page--;
				}
				this.carregarAcademicos();
			}
		});
	}

	abrirPreview(): void {
		this.dialog.open(CertificadoPreviewDialog, {
			width: '100%',
			maxWidth: '800px',
			maxHeight: '90vh',
			data: {
				certificado: this.certificado,
				tipoCertificaNome: this.tipoCertificaNome,
				academicoExemplo: this.academicoExemplo,
				fundoUrl: this.fundoObjectUrl ?? this.fundoServidorUrl,
				versoUrl: this.versoObjectUrl ?? this.versoServidorUrl,
			},
		});
	}

	onFundoSelected(file: File | null): void {
		this.fundoImagem = file;
		this.fundoErro = null;
		this.fundoSalvo = false;

		if (this.fundoObjectUrl) {
			URL.revokeObjectURL(this.fundoObjectUrl);
		}
		this.fundoObjectUrl = file ? URL.createObjectURL(file) : null;
	}

	salvarFundo(): void {
		if (!this.fundoImagem || !this.fundoImagemId || this.salvandoFundo) {
			return;
		}

		this.salvandoFundo = true;
		this.fundoErro = null;
		this.fundoSalvo = false;

		this.imagensService.updateFundo(this.fundoImagemId, this.fundoImagem).subscribe({
			next: () => {
				this.salvandoFundo = false;
				this.fundoSalvo = true;
				if (this.fundoServidorUrl) {
					URL.revokeObjectURL(this.fundoServidorUrl);
				}
				this.fundoServidorUrl = this.fundoObjectUrl;
				this.fundoObjectUrl = null;
				this.fundoImagem = null;
				this.fundoDropzone?.reset();
			},
			error: () => {
				this.salvandoFundo = false;
				this.fundoErro = 'Não foi possível salvar a nova imagem de fundo. Tente novamente.';
			},
		});
	}

	onVersoSelected(file: File | null): void {
		this.versoImagem = file;
		this.versoErro = null;
		this.versoSalvo = false;

		if (this.versoObjectUrl) {
			URL.revokeObjectURL(this.versoObjectUrl);
		}
		this.versoObjectUrl = file ? URL.createObjectURL(file) : null;
	}

	salvarVerso(): void {
		if (!this.versoImagem || this.salvandoVerso) {
			return;
		}

		this.salvandoVerso = true;
		this.versoErro = null;
		this.versoSalvo = false;

		const request$ = this.versoImagemId
			? this.imagensService.updateVerso(this.versoImagemId, this.versoImagem)
			: this.imagensService.addVerso(this.certificado.id, this.versoImagem);

		request$.subscribe({
			next: () => {
				this.salvandoVerso = false;
				this.versoSalvo = true;
				if (this.versoServidorUrl) {
					URL.revokeObjectURL(this.versoServidorUrl);
				}
				this.versoServidorUrl = this.versoObjectUrl;
				this.versoObjectUrl = null;
				this.versoImagem = null;
				this.versoDropzone?.reset();

				if (!this.versoImagemId) {
					this.imagensService.findByCertificado(this.certificado.id).subscribe({
						next: imagens => {
							this.versoImagemId = imagens.find(imagem => imagem.verso)?.id ?? null;
						},
					});
				}
			},
			error: () => {
				this.salvandoVerso = false;
				this.versoErro = 'Não foi possível enviar a imagem do verso. Tente novamente.';
			},
		});
	}

	private carregarImagemServidor(imagemId: number, atribuir: (url: string) => void): void {
		this.imagensService.loadImage(imagemId).subscribe({
			next: blob => atribuir(URL.createObjectURL(blob)),
		});
	}
}
