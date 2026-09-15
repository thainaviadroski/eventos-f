import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { EventosService } from './service/eventos/eventos.service';
import { CertificadoService } from './service/certificado/certificado.service';
import { AcademicoService } from './service/academico/academico.service';


export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home').then(m => m.Home)
	},
	{
		path: 'eventos',
		loadComponent: () => import('./pages/eventos/eventos').then(m => m.Eventos)
	},
	{
		path: 'eventos/:eventoId/detail',
		resolve: {
			evento: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(EventosService);
				const eventoId = Number(route.paramMap.get('eventoId'));
				return service.find(eventoId);
			}
		},
		loadComponent: () => import('./pages/eventos/eventos-details/eventos-details').then(m => m.EventosDetails)
		//Vamos adicionar o resolver aqui posteriormente para carregar os detalhes do evento antes de abrir a tela de detalhes
	},
	{
		path: 'eventos/:eventoId/certificados/:certificadoId',
		resolve: {
			certificado: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(CertificadoService);
				const certificadoId = Number(route.paramMap.get('certificadoId'));
				return service.find(certificadoId);
			}
		},
		loadComponent: () => import('./pages/certificados/certificado-details/certificado-details').then(m => m.CertificadoDetails)
	},
	{
		path: 'academicos',
		loadComponent: () => import('./pages/academicos/academicos').then(m => m.Academicos)
	},
	{
		path: 'academicos/:academicoId/detail',
		resolve: {
			academico: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(AcademicoService);
				const academicoId = Number(route.paramMap.get('academicoId'));
				return service.find(academicoId);
			}
		},
		loadComponent: () => import('./pages/academicos/academico-details/academico-details').then(m => m.AcademicoDetails)
	}
];
