export interface AcademicoExemplo {
	nome: string;
	cpf: string;
	ra: string;
	ch: number;
}

export const ACADEMICO_EXEMPLO_PADRAO: AcademicoExemplo = {
	nome: 'Ana Beatriz Souza',
	cpf: '123.456.789-00',
	ra: '2023000123',
	ch: 40,
};

export function comDadosDeExemplo(texto: string, academico: AcademicoExemplo = ACADEMICO_EXEMPLO_PADRAO): string {
	const dados: Record<string, string> = {
		nome: academico.nome,
		cpf: academico.cpf,
		ra: academico.ra,
		ch: `${academico.ch}`,
	};

	return Object.entries(dados).reduce(
		(atual, [chave, valor]) => atual.replace(new RegExp(`\\{\\{?\\s*${chave}\\s*\\}?\\}`, 'gi'), valor),
		texto,
	);
}
