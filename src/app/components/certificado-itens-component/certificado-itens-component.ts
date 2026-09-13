import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-certificado-itens-component',
	imports: [MatIconModule, MatTooltipModule, DatePipe],
	templateUrl: './certificado-itens-component.html',
	styleUrl: './certificado-itens-component.css',
})
export class CertificadoItensComponent {

	@Input() certificado: any;

	@Output() editCertificado = new EventEmitter<void>();
	@Output() viewCertificado = new EventEmitter<void>();

	toolTipOptions = {
		showDelay: 300,
		hideDelay: 2000
	};

	onEdit() {
		this.editCertificado.emit();
	}

	onView() {
		this.viewCertificado.emit();
	}
}
