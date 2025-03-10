/* cSpell:disable */
export enum PageSelector {
  LogIn = "/api/auth/login",
  LogOut = "/api/auth/logout",
  CompleteRegister = "/completar-cadastro",

  HomePage = "pagina-principal",
  MatriculaInicial = "matricula-inicial",
  Usuário = "usuario",

  Escola = "escola",
  GestorEscolar = "gestor-escolar",
  Remanejamento = "remanejamento",
  Turma = "turma",
  Aluno = "aluno",
  Funcionário = "funcionario",
  ProfissionalEscolar = "profissional-escolar",
  Migração = "migracao",

  Identificação = "identificacao",
  Caracterização = "caracterizacao",
  OrgEscolar = "organizacao-escolar",
  Administrativo = "administrativo",

  Pesquisar_Editar = "pesquisar_ou_editar",
  BloquearAcesso = "bloquear-acesso",
  Desbloquear = "desbloquear",

  MeuPerfil = "meu-perfil",
  Editar = "editar",
  Preferências = "preferencias",
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
  OtherError = 999,
}

export enum Endpoint {
  Escola = "escola",
  Gestor = "diretor/gestor",
  Funcionário = "funcionario",
  EditarFuncionário = "funcionario/get/",
}

export enum Description {
  RegisterEmployee = "Registro de Funcionário",
  RegisterManager = "Registro de Gestor",
  RegisterSchool = "Registro de Escola",
  EditUserProfile = "Edição de dados do Usuário",
  EditSchoolData = "Edição de informações da Escola",
}

export enum SubSize {
  one = 0,
  two = 3,
  three = 5,
  four = 7,
}

export type Audit = {
  id: string;
  dataHora: string;
  maquina: string;
  descricao: string;
  funcionario: string;
};

export type Individual = {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai: string;

  endereco: Address;

  estadoCivil: string;
  nomeConjuge: string | null;
  foneConjuge: string | null;
};

export interface Employee extends Individual {
  funcao: string;
  cargaHoraria: string;
  horarios: string[];
  tipoVinculo: string;
  dataAdmissao: string;
  localTrabalho: string;
  salario: number;
  dataRecebimento: string;
  escolaridade: string;
  curso: string;
}

export interface Managers extends Employee {
  cargo: string;
  portaria: string;
  escola: School;
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

export type School = {
  id?: string;
  inep: string;
  nomeEscola: string;
  cnpjEscola: string;
  situacao: string;
  telefone: string;
  email: string;

  endereco: Address;
  diretorResponsavel?: { id: string; cpf: string } | Managers | null;
  professores?: string[];
  funcionario?: Employee[];
};

// ----------> IBGE API DATA TYPES
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
