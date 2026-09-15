import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Academico } from '../../models/academico.model';

@Component({
	selector: 'app-academico-itens-component',
	imports: [MatIconModule, MatTooltipModule],
	templateUrl: './academico-itens-component.html',
	styleUrl: './academico-itens-component.css',
})
export class AcademicoItensComponent {

	@Input() academico!: Academico;

	@Output() viewDetail = new EventEmitter<void>();

	toolTipOptions = {
		showDelay: 300,
		hideDelay: 2000
	};

	onDetail() {
		this.viewDetail.emit();
	}
}
