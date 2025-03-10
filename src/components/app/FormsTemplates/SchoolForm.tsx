import { School } from "@/types/types";
import { Label, Select, TextInput } from "flowbite-react";

interface SchoolFormInterface {
  schoolData: School;
  handleSchoolData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SchoolForm({ schoolData, handleSchoolData }: SchoolFormInterface) {
  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    // CNPJ Mask
    if (e.target.name === "cnpjEscola") {
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
      <h1 className="text-center text-lg font-bold text-extraColor">INSIRA OS DADOS DA ESCOLA</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <Label>Nome</Label>
          <TextInput
            type="text"
            name="nomeEscola"
            placeholder="Nome da Escola"
            value={schoolData.nomeEscola}
            onChange={handleSchoolData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>CNPJ</Label>
          <TextInput
            type="text"
            name="cnpjEscola"
            placeholder="12.345.678/0001-00"
            value={schoolData.cnpjEscola}
            onChange={handleMasks}
            minLength={18}
            maxLength={18}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>INEP</Label>
          <TextInput
            type="text"
            name="inep"
            placeholder="00000000"
            value={schoolData.inep}
            onChange={handleMasks}
            minLength={8}
            maxLength={8}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Situação</Label>
          <Select name="situacao" value={schoolData.situacao} onChange={handleSchoolData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Telefone</Label>
          <TextInput
            type="text"
            name="telefone"
            placeholder="(00) 9 1234-5678"
            value={schoolData.telefone}
            onChange={handleMasks}
            minLength={15}
            maxLength={15}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>E-mail</Label>
          <TextInput
            type="email"
            name="email"
            placeholder="email@provedor.com"
            value={schoolData.email}
            onChange={handleSchoolData}
            required
          />
        </div>
      </div>
    </div>
  );
}
