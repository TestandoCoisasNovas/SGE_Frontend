import { Individual } from "@/types/types";
import React from "react";

interface IndividualFormInterface {
  individualData: Individual;
  handleIndividualData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function IndividualForm({ individualData, handleIndividualData }: IndividualFormInterface) {
  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    // PHONE Mask
    if (name === "telefone") {
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
      <h1 className="text-xl font-bold">INSIRA OS DADOS DA PESSOA</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <label>Nome</label>
          <input type="text" name="nome" value={individualData.nome} onChange={handleIndividualData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Telefone</label>
          <input type="text" name="telefone" value={individualData.telefone} onChange={handleMasks} required />
        </div>
        <div className="flex flex-col p-2">
          <label>E-mail</label>
          <input type="email" name="email" value={individualData.email} onChange={handleIndividualData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={individualData.cpf}
            onChange={handleMasks}
            minLength={14}
            maxLength={14}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>RG</label>
          <input type="text" name="rg" value={individualData.rg} onChange={handleIndividualData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={individualData.dataNascimento}
            onChange={handleIndividualData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Nome da Mãe</label>
          <input type="text" name="nomeMae" value={individualData.nomeMae} onChange={handleIndividualData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Nome do Pai</label>
          <input type="text" name="nomePai" value={individualData.nomePai} onChange={handleIndividualData} />
        </div>
        <div className="flex flex-col p-2">
          <label>Estado Civil</label>
          <select name="estadoCivil" value={individualData.estadoCivil} onChange={handleIndividualData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Separado">Separado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viúvo">Viúvo</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          <label>Nome do Cônjuge</label>
          <input
            type="text"
            name="nomeConjuge"
            value={individualData.nomeConjuge}
            onChange={handleIndividualData}
            disabled={individualData.estadoCivil !== "Casado"}
            required={individualData.estadoCivil === "Casado"}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Telefone do Cônjuge</label>
          <input
            type="text"
            name="foneConjuge"
            value={individualData.foneConjuge}
            onChange={handleIndividualData}
            disabled={individualData.estadoCivil !== "Casado"}
            required={individualData.estadoCivil === "Casado"}
          />
        </div>
      </div>
    </div>
  );
}
