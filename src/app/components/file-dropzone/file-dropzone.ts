import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-file-dropzone',
	imports: [MatIcon, MatButtonModule, MatTooltipModule],
	templateUrl: './file-dropzone.html',
	styleUrl: './file-dropzone.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDropzone implements OnDestroy {
	@Input() label = 'Arquivo';
	@Input() hint = 'Até 5MB';
	@Input() accept = '*/*';
	@Input() maxSizeBytes = 5 * 1024 * 1024;
	@Input() disabled = false;

	@Output() fileChange = new EventEmitter<File | null>();

	@ViewChild('fileInput') private fileInputRef?: ElementRef<HTMLInputElement>;

	file: File | null = null;
	previewUrl: string | null = null;
	erro: string | null = null;
	isDragOver = false;

	ngOnDestroy(): void {
		if (this.previewUrl) {
			URL.revokeObjectURL(this.previewUrl);
		}
	}

	get isImage(): boolean {
		return !!this.file && this.file.type.startsWith('image/');
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.handleFile(input.files?.[0] ?? null);
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();

		if (!this.disabled) {
			this.isDragOver = true;
		}
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver = false;
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver = false;

		if (this.disabled) {
			return;
		}

		this.handleFile(event.dataTransfer?.files?.[0] ?? null);
	}

	reset(): void {
		if (this.fileInputRef) {
			this.fileInputRef.nativeElement.value = '';
		}

		this.erro = null;
		this.setFile(null);
	}

	remover(input: HTMLInputElement, event?: Event): void {
		event?.stopPropagation();
		input.value = '';
		this.erro = null;
		this.setFile(null);
	}

	tamanhoFormatado(): string {
		if (!this.file) {
			return '';
		}

		const kb = this.file.size / 1024;
		return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
	}

	private handleFile(file: File | null): void {
		if (!file) {
			return;
		}

		if (!this.matchesAccept(file)) {
			this.erro = 'Tipo de arquivo não suportado.';
			return;
		}

		if (file.size > this.maxSizeBytes) {
			const limiteMb = (this.maxSizeBytes / (1024 * 1024)).toFixed(0);
			this.erro = `O arquivo deve ter no máximo ${limiteMb}MB.`;
			return;
		}

		this.erro = null;
		this.setFile(file);
	}

	private matchesAccept(file: File): boolean {
		const patterns = this.accept
			.split(',')
			.map(pattern => pattern.trim().toLowerCase())
			.filter(Boolean);

		if (patterns.length === 0 || patterns.includes('*/*') || patterns.includes('*')) {
			return true;
		}

		const fileName = file.name.toLowerCase();
		const fileType = (file.type || '').toLowerCase();

		return patterns.some(pattern => {
			if (pattern.startsWith('.')) {
				return fileName.endsWith(pattern);
			}

			if (pattern.endsWith('/*')) {
				return fileType.startsWith(pattern.slice(0, -1));
			}

			return fileType === pattern;
		});
	}

	private setFile(file: File | null): void {
		if (this.previewUrl) {
			URL.revokeObjectURL(this.previewUrl);
		}

		this.file = file;
		this.previewUrl = file && file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
		this.fileChange.emit(file);
	}
}
