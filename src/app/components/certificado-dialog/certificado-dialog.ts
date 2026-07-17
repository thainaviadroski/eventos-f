import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: 'app-certificado-dialog',
	imports: [MatDialogContent, MatIcon, MatFormField, MatInputModule, MatButtonModule, MatDialogClose],
	templateUrl: './certificado-dialog.html',
	styleUrl: './certificado-dialog.css',
})
export class CertificadoDialog {

	@Input() eventoId: number | null = null;



}
