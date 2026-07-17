import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';


@Component({
	selector: 'app-eventos-dialog',
	imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatFormField, MatLabel, MatIconModule, MatInputModule, MatDatepickerInput, MatDatepickerToggle, MatDatepicker],
	templateUrl: './eventos-dialog.html',
	styleUrl: './eventos-dialog.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideNativeDateAdapter()],
})
export class EventosDialog {
	readonly dialogRef = inject(MatDialogRef<EventosDialog>);
}
