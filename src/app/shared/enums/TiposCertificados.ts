export enum TiposCertificados {
	PARTICIPANTE = "PARTICIPANTE",
	ORGANIZADOR = "ORGANIZADOR",
	PALESTRANTE = "PALESTRANTE",
	COORDENADOR = "COORDENADOR",
}

export const TiposCertificadosInfo: Record<TiposCertificados, { name: string; description: string }> = {
	[TiposCertificados.PARTICIPANTE]: {
		name: "Participante",
		description: "Discente/Docente que esteve presente no evento",
	},
	[TiposCertificados.ORGANIZADOR]: {
		name: "Organizador",
		description: "Discente/Docente que foi responsavel pela organização do evento",
	},
	[TiposCertificados.PALESTRANTE]: {
		name: "Palestrante",
		description: "Dicente/Docente/Convidado que ministrou palestra durante o evento",
	},
	[TiposCertificados.COORDENADOR]: {
		name: "Coordenador",
		description: "Coordenador de curso responsavel pelo evento",
	},
};

export const getName = (tipo: TiposCertificados): string =>
	TiposCertificadosInfo[tipo].name;

export const getDescription = (tipo: TiposCertificados): string =>
	TiposCertificadosInfo[tipo].description;
