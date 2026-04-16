import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoService } from '../../../service/certificado/certificado-service';

@Component({
	selector: 'app-eventos-details',
	imports: [DatePipe, MatIcon],
	templateUrl: './eventos-details.html',
	styleUrl: './eventos-details.css',
})
export class EventosDetails implements OnInit {

	evento: any;
	certificados: any[] = [];
	constructor(private route: ActivatedRoute, private router: Router, private certificadoService: CertificadoService) {
		this.evento = this.route.snapshot.data['evento'];
	}

	ngOnInit(): void {
		this.loadCertificados();
	}

	loadCertificados() {
		this.certificadoService.getByEvento(this.evento.id).subscribe((certificados) => {
			this.certificados = certificados;
		});
	}

}
