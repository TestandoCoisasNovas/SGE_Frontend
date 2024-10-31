/* cSpell:disable */
export enum PageSelector {
  HomePage = "/",
  MatriculaInicial = "matricula-inicial",
  Escola = "escola",
  GestorEscolar = "gestor-escolar",
  Remanejamento = "remanejamento",
  Turma = "turma",
  Aluno = "aluno",
  ProfissionalEscolar = "profissional-escolar",
  Migração = "migracao",

  Cadastro = "cadastro",
  Identificação = "identificacao",
  Caracterização = "caracterizacao",
  OrgEscolar = "organizacao-escolar",

  Pesquisar = "pesquisar",
  BloquearAcesso = "bloquear-acesso",
  Desbloquear = "desbloquear",
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum SubSize {
  one = 0,
  two = 3,
  three = 5,
  four = 7,
}

export type EmployeeData = {
  id: string;
  nome: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai: string;
  telefone: string;
  localizacao: Address;
  estadoCivil: string;
  nomeConjuge: string;
  foneConjuge: string;
  dependentes: boolean;
  funcao: string;
  tipoVinculo: string;
  dataAdmissao: string;
  localTrabalho: string;
  salario: number;
  dataRecebimento: string;
  escolaridade: string;
  curso: string;
  escola: string;
};

export type Address = {
  id: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  tipoLocalidade: string;
};

export type SchoolDataType = {
  id: string;
  inep: string;
  nome: string;
  cnpj: string;
  situacao: string;
  telefone: string;
  localizacao: Address;
  responsavel?: EmployeeData;
};

export type IBGE_UF_DataType = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export type IBGE_CITIES_DataType = {
  id: number;
  nome: string;
};
