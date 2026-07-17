import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoItensComponent } from "../../../components/certificado-itens-component/certificado-itens-component";
import { CertificadoService } from '../../../service/certificado/certificado.service';
import { MatDialog } from '@angular/material/dialog';
import { CertificadoDialog } from '../../../components/certificado-dialog/certificado-dialog';
import { PAGES_SIZE_OPTIONS } from '../../../shared/utils/Constraints';

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


	readonly dialog = inject(MatDialog);

	readonly pageSizeOptions: number[] = PAGES_SIZE_OPTIONS;


	constructor(private route: ActivatedRoute, private router: Router, private certificadoService: CertificadoService) {
		this.evento = this.route.snapshot.data['evento'];
	}

	ngOnInit(): void {
		this.loadCertificados();
	}

	onPageChange(event: PageEvent): void {
		this.page = event.pageIndex + 1;
		this.size = event.pageSize;
		this.loadCertificados();
	}

	openModalNewCertificado() {
		this.dialog.open(CertificadoDialog, {
			width: '100%',
			maxWidth: '1000px',
			height: '800px'
		});
	}

	loadCertificados() {
		this.certificadoService.getByEvento(this.evento.id, { page: this.page, size: this.size })
			.subscribe((response) => {
				this.certificados = response.content;
				this.totalElements = response.totalElements;

			});
	}

}
