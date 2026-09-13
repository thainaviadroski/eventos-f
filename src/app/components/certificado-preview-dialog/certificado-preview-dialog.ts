import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

import { Certificado } from '../../models/certificado.model';
import {
	ACADEMICO_EXEMPLO_PADRAO,
	AcademicoExemplo,
	comDadosDeExemplo,
} from '../../shared/utils/certificado-preview.util';

export interface CertificadoPreviewDialogData {
	certificado: Certificado;
	tipoCertificaNome: string;
	academicoExemplo?: AcademicoExemplo;
	fundoUrl: string | null;
	versoUrl: string | null;
}

@Component({
	selector: 'app-certificado-preview-dialog',
	imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDivider, MatIcon, MatButtonModule],
	templateUrl: './certificado-preview-dialog.html',
	styleUrl: './certificado-preview-dialog.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificadoPreviewDialog {
	private readonly data = inject<CertificadoPreviewDialogData>(MAT_DIALOG_DATA);

	readonly certificado = this.data.certificado;
	readonly tipoCertificaNome = this.data.tipoCertificaNome;
	readonly academicoExemplo = this.data.academicoExemplo ?? ACADEMICO_EXEMPLO_PADRAO;
	readonly fundoUrl = this.data.fundoUrl;
	readonly versoUrl = this.data.versoUrl;

	get previewCabecalho(): string {
		return comDadosDeExemplo(this.certificado.cabecalho, this.academicoExemplo);
	}

	get previewCorpo(): string {
		return comDadosDeExemplo(this.certificado.corpo, this.academicoExemplo);
	}

	get previewRodape(): string {
		return comDadosDeExemplo(this.certificado.rodape, this.academicoExemplo);
	}
}
