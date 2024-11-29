import { SchoolDataType } from "@/types/types";

interface SchoolFormInterface {
  schoolData: SchoolDataType;
  handleSchoolData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SchoolForm({ schoolData, handleSchoolData }: SchoolFormInterface) {
  return (
    <>
      <div className="flex flex-col p-2">
        <label>Nome</label>
        <input type="text" name="nomeEscola" value={schoolData.nomeEscola} onChange={handleSchoolData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>CNPJ</label>
        <input
          type="text"
          name="cnpj"
          value={schoolData.cnpjEscola}
          onChange={handleSchoolData}
          minLength={18}
          maxLength={18}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>INEP</label>
        <input
          type="text"
          name="inep"
          value={schoolData.inep}
          onChange={handleSchoolData}
          minLength={8}
          maxLength={8}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Situação</label>
        <select name="situacao" value={schoolData.situacao} onChange={handleSchoolData} required>
          <option hidden disabled value="">
            Selecione uma Opção
          </option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>
      <div className="flex flex-col p-2">
        <label>Telefone</label>
        <input
          type="string"
          name="telefone"
          value={schoolData.telefone}
          onChange={handleSchoolData}
          minLength={15}
          maxLength={15}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>E-mail</label>
        <input type="email" name="email" value={schoolData.email} onChange={handleSchoolData} required />
      </div>
    </>
  );
}
