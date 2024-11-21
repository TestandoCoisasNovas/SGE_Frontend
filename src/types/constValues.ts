// cSpell:disable
// NO OBJECT INSIDE OBJECT SECTION
export const InitialAddressData = {
  rua: "",
  numero: "",
  bairro: "",
  referencia: "",
  cidade: "",
  estado: "",
  zonaResidencial: "",
};

const InitialGestorData = {
  cargo: "",
  password: "",
  portaria: "",
};

// OBJECT INSIDE OBJECT SECTION
export const InitialSchoolData = {
  inep: "",
  nomeEscola: "",
  cnpjEscola: "",
  situacao: "",
  telefone: "",
  email: "",
  endereco: InitialAddressData,
};

export const InitialWorkerData = {
  id: "",
  nome: "",
  rg: "",
  cpf: "",
  dataNascimento: "",
  nomeMae: "",
  nomePai: "",
  telefone: "",
  email: "",

  localizacao: InitialAddressData,

  estadoCivil: "",
  nomeConjuge: "",
  foneConjuge: "",
  dependentes: false,
  funcao: "",
  tipoVinculo: "",
  dataAdmissao: "",
  localTrabalho: "",
  salario: 0,
  dataRecebimento: "",
  escolaridade: "",
  curso: "",

  escola: InitialSchoolData,
  ...InitialGestorData,
};
