/* cSpell:disable */
export enum PageSelector {
  HomePage = "pagina-principal",
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
  Administrativo = "administrativo",

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

export enum StatusResponse {
  Null = -1,
  Loading = 0,
  Success = 200,
  Error = 400,
}

export enum Endpoint {
  Escola = "escola",
  Diretor = "diretor",
}

export enum SubSize {
  one = 0,
  two = 3,
  three = 5,
  four = 7,
}

export type Worker = {
  id: string;
  nome: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai: string;
  telefone: string;
  email: string;

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

  escola: SchoolDataType;
};

export interface Managers extends Worker {
  cargo: string;
  portaria: string;
  password: string;
}

export type Address = {
  id?: string;
  rua: string;
  numero: string;
  bairro: string;
  referencia: string;
  cidade: string;
  estado: string;
  zonaResidencial: string;
};

export type SchoolDataType = {
  id?: string;
  inep: string;
  nomeEscola: string;
  cnpjEscola: string;
  situacao: string;
  telefone: string;
  email: string;

  endereco: Address;
  diretorResponsavel?: Managers | null;
  professores?: string[];
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

export type User_Login_DataType = {
  cpf: string;
  password: string;
};
