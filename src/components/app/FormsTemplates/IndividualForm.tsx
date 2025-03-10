import { Individual } from "@/types/types";
import { Datepicker, Label, Select, TextInput } from "flowbite-react";
import React from "react";
// cspell: disable

interface IndividualFormInterface {
  individualData: Individual;
  handleIndividualData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handleDates: (value: Date | null, name: string) => void;
}

export default function IndividualForm({ individualData, handleIndividualData, handleDates }: IndividualFormInterface) {
  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    // PHONE Mask
    if (name === "telefone" || name === "foneConjuge") {
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
      handleIndividualData(event as React.ChangeEvent<HTMLInputElement>);
    }
    // CPF Mask
    else if (e.target.name === "cpf") {
      const updatedCpf = e.target.value
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: updatedCpf,
        },
      };
      handleIndividualData(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-center text-lg font-bold text-extraColor">INSIRA OS DADOS DA PESSOA</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <Label>Nome</Label>
          <TextInput
            type="text"
            name="nome"
            placeholder="Seu Nome Completo"
            value={individualData.nome}
            onChange={handleIndividualData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Telefone</Label>
          <TextInput
            type="text"
            name="telefone"
            placeholder="(00) 9 1234-5678"
            value={individualData.telefone}
            onChange={handleMasks}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>E-mail</Label>
          <TextInput
            type="email"
            name="email"
            placeholder="email@provedor.com"
            value={individualData.email}
            onChange={handleIndividualData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>CPF</Label>
          <TextInput
            type="text"
            name="cpf"
            placeholder="123.456.789-00"
            value={individualData.cpf}
            onChange={handleMasks}
            minLength={14}
            maxLength={14}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>RG</Label>
          <TextInput
            type="text"
            name="rg"
            placeholder="Seu RG"
            value={individualData.rg}
            onChange={handleIndividualData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Data de Nascimento</Label>
          <Datepicker
            language="pt-BR"
            labelTodayButton="Hoje"
            labelClearButton="Limpar"
            value={new Date(individualData.dataNascimento)}
            onChange={(e) => handleDates(e, "dataNascimento")}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Nome da Mãe</Label>
          <TextInput
            type="text"
            name="nomeMae"
            placeholder="Nome da Mãe"
            value={individualData.nomeMae}
            onChange={handleIndividualData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Nome do Pai</Label>
          <TextInput
            type="text"
            name="nomePai"
            placeholder="Nome do Pai"
            value={individualData.nomePai}
            onChange={handleIndividualData}
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Estado Civil</Label>
          <Select name="estadoCivil" value={individualData.estadoCivil} onChange={handleIndividualData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Separado">Separado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viúvo">Viúvo</option>
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Nome do Cônjuge</Label>
          <TextInput
            type="text"
            name="nomeConjuge"
            placeholder="Nome do Côjuge"
            value={individualData.nomeConjuge ? individualData.nomeConjuge : ""}
            onChange={handleIndividualData}
            disabled={individualData.estadoCivil !== "Casado"}
            required={individualData.estadoCivil === "Casado"}
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Telefone do Cônjuge</Label>
          <TextInput
            type="text"
            // cspell: disable-next-line
            name="foneConjuge"
            placeholder="(00) 9 1234-5678"
            value={individualData.foneConjuge ? individualData.foneConjuge : ""}
            onChange={handleIndividualData}
            disabled={individualData.estadoCivil !== "Casado"}
            required={individualData.estadoCivil === "Casado"}
          />
        </div>
      </div>
    </div>
  );
}
