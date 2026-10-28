import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { AcademicoService } from '../../service/academico/academico.service';


export const academicosRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./academicos').then(m => m.Academicos)
	},
	{
		path: ':academicoId/detail',
		resolve: {
			academico: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(AcademicoService);
				const academicoId = Number(route.paramMap.get('academicoId'));
				return service.find(academicoId);
			}
		},
		loadComponent: () => import('./academico-details/academico-details').then(m => m.AcademicoDetails)
	}
];
