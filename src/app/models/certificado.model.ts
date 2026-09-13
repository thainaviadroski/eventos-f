import { TiposCertificados } from '../shared/enums/TiposCertificados';

export interface Certificado {
	id: number;
	eventoId: number;
	cabecalho: string;
	corpo: string;
	rodape: string;
	descricao: string | null;
	tipoCertifica: TiposCertificados;
	createdBy: string;
	updatedBy: string;
	created: string;
	updated: string;
}

export type CertificadoPayload = Pick<Certificado,
	'eventoId' | 'cabecalho' | 'corpo' | 'rodape' | 'descricao' | 'tipoCertifica' | 'createdBy' | 'created'
>;
