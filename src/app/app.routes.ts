import { Routes } from '@angular/router';


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
		loadComponent: () => import('./pages/eventos/eventos-details/eventos-details').then(m => m.EventosDetails)
		//Vamos adicionar o resolver aqui posteriormente para carregar os detalhes do evento antes de abrir a tela de detalhes
	}
];
