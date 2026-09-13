export enum TiposCertificados {
	PARTICIPANTE = "Participante",
	ORGANIZADOR = "Organizador",
	PALESTRANTE = "Palestrante",
	COORDENADOR = "Coordenador",
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

export const toTiposCertificados = (value: string | null | undefined): TiposCertificados | null => {
	if (!value) {
		return null;
	}

	return Object.values(TiposCertificados).find(
		tipo => tipo.toLowerCase() === value.toLowerCase()
	) ?? null;
};
