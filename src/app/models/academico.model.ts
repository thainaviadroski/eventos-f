export interface Academico {
	id: number;
	academico: string;
	email: string | null;
	cpf: string;
	ra: string | null;
	createdBy: string;
	updatedBy: string;
	created: string;
	updated: string;
}

export type AcademicoPayload = Omit<Academico, 'id'>;
