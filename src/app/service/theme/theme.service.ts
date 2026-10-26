import { Injectable, signal } from '@angular/core';

// Mesmos valores usados pelo script em index.html
const STORAGE_KEY = 'theme';
const DARK_CLASS = 'dark-theme';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {

	// O tema inicial (salvo ou do sistema) já é aplicado pelo index.html antes do Angular carregar
	readonly isDark = signal(document.documentElement.classList.contains(DARK_CLASS));

	toggle(): void {
		const dark = !this.isDark();

		document.documentElement.classList.toggle(DARK_CLASS, dark);
		localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
		this.isDark.set(dark);
	}
}
