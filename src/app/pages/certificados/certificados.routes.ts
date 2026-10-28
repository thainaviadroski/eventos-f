import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { CertificadoService } from '../../service/certificado/certificado.service';


export const certificadosRoutes: Routes = [
	{
		path: ':certificadoId',
		resolve: {
			certificado: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
				const service = inject(CertificadoService);
				const certificadoId = Number(route.paramMap.get('certificadoId'));
				return service.find(certificadoId);
			}
		},
		loadComponent: () => import('./certificado-details/certificado-details').then(m => m.CertificadoDetails)
	}
];
