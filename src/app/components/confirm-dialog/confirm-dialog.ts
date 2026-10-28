import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

export interface ConfirmDialogData {
	titulo: string;
	mensagem: string;
	textoConfirmar: string;
	mensagemSucesso: string;
	acao: () => Observable<unknown>;
}

type EstadoConfirmacao = 'confirmar' | 'processando' | 'sucesso' | 'erro';

/**
 * Pede confirmação, executa a ação e exibe o resultado no próprio dialog.
 * Fecha com `true` somente quando a ação foi concluída com sucesso.
 */
@Component({
	selector: 'app-confirm-dialog',
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatDivider,
		MatIcon,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './confirm-dialog.html',
	styleUrl: './confirm-dialog.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
	private readonly dialogRef = inject(MatDialogRef<ConfirmDialog, boolean>);
	readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

	readonly estado = signal<EstadoConfirmacao>('confirmar');

	confirmar(): void {
		if (this.estado() === 'processando') {
			return;
		}

		this.estado.set('processando');
		this.dialogRef.disableClose = true;

		this.data.acao().subscribe({
			next: () => {
				// Após o sucesso, o dialog só fecha pelo botão OK, garantindo o retorno `true` para quem abriu
				this.estado.set('sucesso');
			},
			error: () => {
				this.estado.set('erro');
				this.dialogRef.disableClose = false;
			},
		});
	}
}
