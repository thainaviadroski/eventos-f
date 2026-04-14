import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-eventos-itens-component',
	imports: [DatePipe, MatIconModule],
	templateUrl: './eventos-itens-component.html',
	styleUrl: './eventos-itens-component.css',
})
export class EventosItensComponent {
	@Input() evento: any;
}
