// cSpell: disable
// ------ NO OBJECTS INSIDE ------
// INITIAL ADDRESS DATA
export const InitialAddressData = {
  rua: "",
  numero: "",
  bairro: "",
  referencia: "",
  cidade: "",
  estado: "",
  zonaResidencial: "",
};

// ------ OBJECTS INSIDE OBJECTS ------
// INITIAL INDIVIDUAL (PESSOA) DATA
export const InitialIndividualData = {
  nome: "",
  telefone: "",
  cpf: "",
  rg: "",
  nomeMae: "",
  nomePai: "",
  dataNascimento: "",
  email: "",

  endereco: InitialAddressData,

  estadoCivil: "",
  nomeConjuge: "",
  foneConjuge: "",
};

// INITIAL EMPLOYEE (FUNCIONARIO) DATA
export const InitialEmployeeData = {
  ...InitialIndividualData,
  funcao: "",
  cargaHoraria: "",
  horarios: [""],
  tipoVinculo: "",
  dataAdmissao: "",
  localTrabalho: "",
  salario: 0,
  dataRecebimento: "",
  escolaridade: "",
  curso: "",
};

// INITIAL SCHOOL DATA
export const InitialSchoolData = {
  inep: "",
  nomeEscola: "",
  cnpjEscola: "",
  situacao: "",
  telefone: "",
  email: "",

  endereco: InitialAddressData,
  diretorResponsavel: { id: "", cpf: "" },
  professores: [""],
};

// INITIAL MANAGERS (DIRETORES/SECRETARIOS) DATA
export const InitialManagersData = {
  ...InitialEmployeeData,
  cargo: "",
  portaria: "",
  escola: InitialSchoolData,
  usuario: {
    login: "",
    password: "",
    perfil: "",
    status: false,
  },
};

// INITIAL SCHOOL STRUCTURE (ESTRUTURA FISICA) DATA
export const InitialSchoolStructure = {
  escola: InitialSchoolData,
  predioProprio: true,
  qtdSalas: 0,
  salasImprovisadas: false,
  qtdSalasImprovisadas: 0,
  horarios: [""],
  diretor: InitialManagersData,
  // turmas:
  // professores:
  // financeiro:
};
