import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
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

	toolTipOptions = {
		showDelay: 300,
		hideDelay: 2000
	};


}
