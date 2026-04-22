import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';


export const DATE_FORMAT = {
	parse: {
		dateInput: 'DD/MM/YYYY',
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'DD/MM/YYYY',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideHttpClient(),
		{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
		{provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
	]
};
