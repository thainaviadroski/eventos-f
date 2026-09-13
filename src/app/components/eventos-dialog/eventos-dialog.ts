import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';

import { Evento, EventoPayload } from '../../models/evento.model';
import { EventosService } from '../../service/eventos/eventos.service';

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

	saving = false;

	readonly form = this.fb.nonNullable.group({
		evento: ['', Validators.required],
		dtInicio: this.fb.control<Date | null>(null, Validators.required),
		dtFinal: this.fb.control<Date | null>(null, Validators.required),
		descricao: ['', Validators.required],
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
			createdBy: 'user',
			updatedBy: 'user',
			created: now,
			updated: now,
		};

		this.saving = true;
		this.form.disable();

		this.service.create(payload).subscribe({
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
