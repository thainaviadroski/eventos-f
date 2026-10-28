/**
 * An academic linked to a certificate, as returned by the import and listing endpoints.
 * The backend does not echo cpf/email/ra back on this record — only on the request.
 */
export interface AcademicoCertificado {
	id: string;
	academicoId: number;
	academico: string;
	certificadoId: number;
	ch: number;
	created: string;
}

/** Mirrors the backend's AcademicoRequestDto — `academico` here is the person's name. */
export interface AcademicoRequest {
	academico: string;
	cpf: string;
	email?: string | null;
	ra?: string | null;
}

export interface AcademicoManualPayload {
	certificadoId: number;
	ch: number;
	academico: AcademicoRequest;
}
