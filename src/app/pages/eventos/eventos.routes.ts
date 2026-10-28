import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { EventosService } from '../../service/eventos/eventos.service';


export const eventosRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./eventos').then(m => m.Eventos)
	},
	{
		path: ':eventoId/detail',
		resolve: {
			evento: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(EventosService);
				const eventoId = Number(route.paramMap.get('eventoId'));
				return service.find(eventoId);
			}
		},
		loadComponent: () => import('./eventos-details/eventos-details').then(m => m.EventosDetails)
	},
	{
		path: ':eventoId/certificados',
		loadChildren: () => import('../certificados/certificados.routes').then(m => m.certificadosRoutes)
	}
];
