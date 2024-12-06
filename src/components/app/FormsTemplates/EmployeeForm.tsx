// FALTA INSERIR → horarios: string[];
// // tipoVinculo: string;

import { Employee } from "@/types/types";
import { useState } from "react";

interface EmployeeFormInterface {
  employeeData: Employee;
  handleEmployeeData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function EmployeeForm({ employeeData, handleEmployeeData }: EmployeeFormInterface) {
  const [displaySalario, setDisplaySalario] = useState<string>(""); // Only the value to be shown
  const [displayDiaPagamento, setDisplayDiaPagamento] = useState<string>(""); // Only the value to be shown

  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    // CURRENCY Mask
    if (name === "salario") {
      const onlyNumericValues = e.target.value.replace(/\D/g, "");
      const formattedValue = (Number(onlyNumericValues) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      // Check Later -> "as unknown" MAYBE HAS ANOTHER SOLUTION TO REMOVE IT?
      const numericValue = (Number(onlyNumericValues) / 100) as unknown;

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: numericValue,
        },
      };

      setDisplaySalario(formattedValue);
      handleEmployeeData(event as React.ChangeEvent<HTMLInputElement>);
    } else if (name === "dataRecebimento") {
      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: e.target.value.toString(),
        },
      };
      handleEmployeeData(event as React.ChangeEvent<HTMLInputElement>);
      setDisplayDiaPagamento(e.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA OS DADOS DE FUNCIONÁRIO ABAIXO</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <label>Função</label>
          <input type="text" name="funcao" value={employeeData.funcao} onChange={handleEmployeeData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Data de Admissão</label>
          <input
            type="date"
            name="dataAdmissao"
            value={employeeData.dataAdmissao}
            onChange={handleEmployeeData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Carga Horária</label>
          <input
            type="text"
            name="cargaHoraria"
            value={employeeData.cargaHoraria}
            onChange={handleEmployeeData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Salário</label>
          <input type="text" name="salario" value={displaySalario} onChange={handleMasks} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Dia de Recebimento</label>
          <input
            type="number"
            name="dataRecebimento"
            min={1}
            max={31}
            value={displayDiaPagamento}
            onChange={handleMasks}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Tipo de Vinculo</label>
          <select name="tipoVinculo" value={employeeData.tipoVinculo} onChange={handleEmployeeData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Contrato">Contrato</option>
            <option value="Portaria">Portaria</option>
            <option value="Efetivo">Efetivo</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          <label>Escolaridade</label>
          <select name="escolaridade" value={employeeData.escolaridade} onChange={handleEmployeeData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Fundamental - Incompleto">Fundamental - Incompleto</option>
            <option value="Fundamental - Completo">Fundamental - Completo</option>
            <option value="Médio - Incompleto">Médio - Incompleto</option>
            <option value="Médio - Completo">Médio - Completo</option>
            <option value="Superior - Incompleto">Superior - Incompleto</option>
            <option value="Superior - Completo">Superior - Completo</option>
            <option value="Pós-graduação - Especialização">Pós-graduação - Especialização</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          <label>Curso</label>
          <input type="text" name="curso" value={employeeData.curso} onChange={handleEmployeeData} required />
        </div>
      </div>
    </div>
  );
}
