import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Academico } from '../../../models/academico.model';

@Component({
	selector: 'app-academico-details',

	templateUrl: './academico-details.html',
	styleUrl: './academico-details.css',
})
export class AcademicoDetails {

	private readonly route = inject(ActivatedRoute);

	academico: Academico = this.route.snapshot.data['academico'];


}
