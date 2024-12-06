import { SchoolDataType } from "@/types/types";

interface SchoolFormInterface {
  schoolData: SchoolDataType;
  handleSchoolData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SchoolForm({ schoolData, handleSchoolData }: SchoolFormInterface) {
  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    // CNPJ Mask
    if (e.target.name === "cnpj") {
      const maskedCNPJ = e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: maskedCNPJ,
        },
      };

      handleSchoolData(event as React.ChangeEvent<HTMLInputElement>);
    }
    // INEP Mask
    else if (e.target.name === "inep") {
      const maskedINEP = e.target.value.replace(/\D/g, "");

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: maskedINEP,
        },
      };

      handleSchoolData(event as React.ChangeEvent<HTMLInputElement>);
    }
    // PHONE Mask
    else if (name === "telefone") {
      const maskedPhone = e.target.value
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/(^\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4}$)/, "$1-$2");

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: maskedPhone,
        },
      };
      handleSchoolData(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA OS DADOS DA ESCOLA ABAIXO</h1>
      <div className="flex flex-wrap items-center justify-center">
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
            onChange={handleMasks}
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
            onChange={handleMasks}
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
            onChange={handleMasks}
            minLength={15}
            maxLength={15}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>E-mail</label>
          <input type="email" name="email" value={schoolData.email} onChange={handleSchoolData} required />
        </div>
      </div>
    </div>
  );
}
