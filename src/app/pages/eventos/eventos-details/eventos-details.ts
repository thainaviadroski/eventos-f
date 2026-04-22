import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoItensComponent } from "../../../components/certificado-itens-component/certificado-itens-component";
import { CertificadoService } from '../../../service/certificado/certificado.service';

@Component({
	selector: 'app-eventos-details',
	imports: [DatePipe, MatIcon, CertificadoItensComponent, MatPaginatorModule],
	templateUrl: './eventos-details.html',
	styleUrl: './eventos-details.css',
})
export class EventosDetails implements OnInit {

	evento: any;

	page = 1;
	size = 5;
	certificados: any[] = [];
	totalElements = 0;

	constructor(private route: ActivatedRoute, private router: Router, private certificadoService: CertificadoService) {
		this.evento = this.route.snapshot.data['evento'];
	}

	ngOnInit(): void {
		this.loadCertificados();
	}


	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex + 1; // mat-paginator começa em 0, JSON Server em 1
		this.size = event.pageSize;
		this.loadCertificados();
	}

	loadCertificados() {
		this.certificadoService.getByEvento(this.evento.id, { page: this.page, size: this.size })
			.subscribe((response) => {
				this.certificados = response.content;
				this.totalElements = response.totalElements;

			});
	}

}
