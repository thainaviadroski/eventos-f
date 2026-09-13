import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoItensComponent } from "../../../components/certificado-itens-component/certificado-itens-component";
import { CertificadoService } from '../../../service/certificado/certificado.service';
import { MatDialog } from '@angular/material/dialog';
import { CertificadoDialog, CertificadoDialogData } from '../../../components/certificado-dialog/certificado-dialog';
import { Certificado } from '../../../models/certificado.model';
import { PAGES_SIZE_OPTIONS } from '../../../shared/utils/Constraints';

@Component({
	selector: 'app-eventos-details',
	imports: [DatePipe, MatIcon, CertificadoItensComponent, MatPaginatorModule],
	templateUrl: './eventos-details.html',
	styleUrl: './eventos-details.css',
})
export class EventosDetails implements OnInit {

	evento: any;
	page = 0;
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
		this.page = event.pageIndex;
		this.size = event.pageSize;
		this.loadCertificados();
	}

	openModalNewCertificado() {
		this.openCertificadoDialog({ eventoId: this.evento.id });
	}

	onEditCertificado(certificado: Certificado) {
		this.openCertificadoDialog({ eventoId: this.evento.id, certificado });
	}

	onViewCertificado(certificado: Certificado) {
		this.router.navigateByUrl(`eventos/${this.evento.id}/certificados/${certificado.id}`);
	}

	private openCertificadoDialog(data: CertificadoDialogData) {
		this.dialog.open(CertificadoDialog, {
			width: '100%',
			maxWidth: '1000px',
			height: '80vh',
			data,
		}).afterClosed().subscribe(result => {
			if (result) {
				this.loadCertificados();
			}
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
