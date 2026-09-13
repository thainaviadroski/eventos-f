import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { FileDropzone } from '../file-dropzone/file-dropzone';
import { Certificado, CertificadoPayload } from '../../models/certificado.model';
import { CertificadoService } from '../../service/certificado/certificado.service';
import { TiposCertificados, TiposCertificadosInfo, toTiposCertificados } from '../../shared/enums/TiposCertificados';

export interface CertificadoDialogData {
	eventoId: number;
	certificado?: Certificado;
}

@Component({
	selector: 'app-certificado-dialog',
	imports: [
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatDivider,
		MatIcon,
		MatFormField,
		MatLabel,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		TextFieldModule,
		FileDropzone,
	],
	templateUrl: './certificado-dialog.html',
	styleUrl: './certificado-dialog.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificadoDialog {
	private readonly dialogRef = inject(MatDialogRef<CertificadoDialog, Certificado | undefined>);
	private readonly service = inject(CertificadoService);
	private readonly fb = inject(FormBuilder);
	private readonly data = inject<CertificadoDialogData>(MAT_DIALOG_DATA);

	readonly isEdit = !!this.data.certificado;
	readonly tipos = Object.values(TiposCertificados);
	readonly tiposInfo = TiposCertificadosInfo;

	saving = false;
	imagem: File | null = null;

	readonly form = this.fb.nonNullable.group({
		cabecalho: [this.data.certificado?.cabecalho ?? '', Validators.required],
		tipoCertifica: [
			toTiposCertificados(this.data.certificado?.tipoCertifica) ?? TiposCertificados.PARTICIPANTE,
			Validators.required,
		],
		corpo: [this.data.certificado?.corpo ?? '', Validators.required],
		rodape: [this.data.certificado?.rodape ?? '', Validators.required],
		descricao: [this.data.certificado?.descricao ?? ''],
	});

	onImagemChange(file: File | null): void {
		this.imagem = file;
	}

	salvar(): void {
		if (this.form.invalid || this.saving) {
			this.form.markAllAsTouched();
			return;
		}

		const { cabecalho, tipoCertifica, corpo, rodape, descricao } = this.form.getRawValue();

		const payload: CertificadoPayload = {
			eventoId: this.data.eventoId,
			cabecalho,
			corpo,
			rodape,
			descricao: descricao || null,
			tipoCertifica,
			createdBy: this.data.certificado?.createdBy ?? 'user',
			created: this.data.certificado?.created ?? new Date().toISOString(),
		};

		this.saving = true;
		this.form.disable();

		const request$ = this.isEdit
			? this.service.update(this.data.certificado!.id, payload, this.imagem)
			: this.service.create(payload, this.imagem);

		request$.subscribe({
			next: certificado => {
				this.saving = false;
				this.dialogRef.close(certificado);
			},
			error: () => {
				this.saving = false;
				this.form.enable();
			},
		});
	}
}
