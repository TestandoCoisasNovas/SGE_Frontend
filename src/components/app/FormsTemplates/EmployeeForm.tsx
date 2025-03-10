// cspell: disable
// MISSING → horarios: string[];

import { Employee } from "@/types/types";
import { Label, TextInput, Select, Datepicker } from "flowbite-react";
import { useState } from "react";

interface EmployeeFormInterface {
  employeeData: Employee;
  handleEmployeeData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handleDates: (value: Date | null, name: string) => void;
}

export default function EmployeeForm({ employeeData, handleEmployeeData, handleDates }: EmployeeFormInterface) {
  const [displaySalario, setDisplaySalario] = useState<string>(""); // Only the value displayed to the user
  const [displayDiaPagamento, setDisplayDiaPagamento] = useState<string>(""); // Only the value displayed to the user

  // ALL MASKS HANDLE
  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // CURRENCY Mask
    if (name === "salario") {
      const onlyNumericValues = value.replace(/\D/g, "");
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
          value: value.toString(),
        },
      };
      handleEmployeeData(event as React.ChangeEvent<HTMLInputElement>);
      setDisplayDiaPagamento(value);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-center text-lg font-bold text-extraColor">INSIRA OS DADOS DE FUNCIONÁRIO ABAIXO</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <Label>Função</Label>
          <TextInput
            type="text"
            name="funcao"
            placeholder="Função Exercida"
            value={employeeData.funcao}
            onChange={handleEmployeeData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Data de Admissão</Label>
          <Datepicker
            language="pt-BR"
            labelTodayButton="Hoje"
            labelClearButton="Limpar"
            value={new Date(employeeData.dataAdmissao)}
            onChange={(e) => handleDates(e, "dataAdmissao")}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Carga Horária</Label>
          <TextInput
            type="text"
            name="cargaHoraria"
            placeholder="Carga Horária Semanal"
            value={employeeData.cargaHoraria}
            onChange={handleEmployeeData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Salário</Label>
          <TextInput
            type="text"
            name="salario"
            placeholder="R$ 0,00"
            value={displaySalario}
            onChange={handleMasks}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Dia de Recebimento</Label>
          <TextInput
            type="number"
            name="dataRecebimento"
            placeholder="0"
            min={1}
            max={31}
            value={displayDiaPagamento}
            onChange={handleMasks}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Tipo de Vinculo</Label>
          <Select name="tipoVinculo" value={employeeData.tipoVinculo} onChange={handleEmployeeData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Contrato">Contrato</option>
            <option value="Portaria">Portaria</option>
            <option value="Efetivo">Efetivo</option>
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Escolaridade</Label>
          <Select name="escolaridade" value={employeeData.escolaridade} onChange={handleEmployeeData} required>
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
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Curso</Label>
          <TextInput
            type="text"
            name="curso"
            placeholder="Curso do Funcionário"
            value={employeeData.curso}
            onChange={handleEmployeeData}
            required
          />
        </div>
      </div>
    </div>
  );
}
