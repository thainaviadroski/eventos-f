import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';

import { Evento, EventoPayload } from '../../models/evento.model';
import { EventosService } from '../../service/eventos/eventos.service';

export interface EventosDialogData {
	evento?: Evento;
}

// Usa apenas a parte da data: "yyyy-MM-dd" puro seria lido como UTC e cairia no dia anterior no fuso local
function toDate(valor: string | null | undefined): Date | null {
	if (!valor) {
		return null;
	}

	const [ano, mes, dia] = valor.split('T')[0].split('-').map(Number);
	return new Date(ano, mes - 1, dia);
}

@Component({
	selector: 'app-eventos-dialog',
	imports: [
		ReactiveFormsModule,
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogContent,
		MatFormField,
		MatLabel,
		MatIconModule,
		MatInputModule,
		MatDatepickerInput,
		MatDatepickerToggle,
		MatDatepicker,
	],
	templateUrl: './eventos-dialog.html',
	styleUrl: './eventos-dialog.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideNativeDateAdapter()],
})
export class EventosDialog {
	readonly dialogRef = inject(MatDialogRef<EventosDialog, Evento | undefined>);
	private readonly service = inject(EventosService);
	private readonly fb = inject(FormBuilder);
	private readonly data = inject<EventosDialogData | null>(MAT_DIALOG_DATA);

	readonly isEdit = !!this.data?.evento;

	saving = false;

	readonly form = this.fb.nonNullable.group({
		evento: [this.data?.evento?.evento ?? '', Validators.required],
		dtInicio: this.fb.control<Date | null>(toDate(this.data?.evento?.dtInicio), Validators.required),
		dtFinal: this.fb.control<Date | null>(toDate(this.data?.evento?.dtFinal), Validators.required),
		descricao: [this.data?.evento?.descricao ?? '', Validators.required],
	});

	salvar(): void {
		if (this.form.invalid || this.saving) {
			this.form.markAllAsTouched();
			return;
		}

		const { evento, dtInicio, dtFinal, descricao } = this.form.getRawValue();
		const now = new Date().toISOString();

		const payload: EventoPayload = {
			evento,
			descricao: descricao || null,
			dtInicio: dtInicio ? dtInicio.toISOString() : null,
			dtFinal: dtFinal ? dtFinal.toISOString() : null,
			createdBy: this.data?.evento?.createdBy ?? 'user',
			updatedBy: 'user',
			created: this.data?.evento?.created ?? now,
			updated: now,
		};

		this.saving = true;
		this.form.disable();

		const request$ = this.isEdit
			? this.service.update(this.data!.evento!.id, payload)
			: this.service.create(payload);

		request$.subscribe({
			next: evento => {
				this.saving = false;
				this.dialogRef.close(evento);
			},
			error: () => {
				this.saving = false;
				this.form.enable();
			},
		});
	}
}
