import { Routes } from '@angular/router';


export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home').then(m => m.Home)
	},
	{
		path: 'eventos',
		loadChildren: () => import('./pages/eventos/eventos.routes').then(m => m.eventosRoutes)
	},
	{
		path: 'academicos',
		loadChildren: () => import('./pages/academicos/academicos.routes').then(m => m.academicosRoutes)
	}
];
