export interface Evento {
	id: number;
	evento: string;
	descricao: string | null;
	slug: string;
	dtInicio: string | null;
	dtFinal: string | null;
	createdBy: string;
	updatedBy: string;
	created: string;
	updated: string;
}

export type EventoPayload = Omit<Evento, 'id' | 'slug'>;
