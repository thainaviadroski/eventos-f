import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { EventosService } from './service/eventos/eventos.service';


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
	}
];
