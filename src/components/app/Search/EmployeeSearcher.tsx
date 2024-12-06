import { InitialEmployeeData } from "@/types/constValues";
import { Employee } from "@/types/types";
import { useState } from "react";

interface EmployeeSearcherInterface {
  handler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  employeeGET?: Employee[] | null;
}

export default function EmployeeSearcher({ handler, employeeGET }: EmployeeSearcherInterface) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(InitialEmployeeData);

  return (
    <div className="flex flex-col w-full items-center max-w-[500px]">
      <h1 className="text-xl font-bold">ESCOLHA UMA FUNCIONÁRIO</h1>
      <select
        className="text-center"
        name="funcionario"
        value={selectedEmployee.nome}
        onChange={(e) => {
          handler(e);
          setSelectedEmployee(employeeGET?.find((school) => school.nome === e.target.value) || InitialEmployeeData);
        }}
      >
        <option hidden disabled value="">
          Selecione uma Opção
        </option>
        {employeeGET?.map((value) => {
          return (
            <option key={value.id} value={value.nome}>
              {value.nome}
            </option>
          );
        })}
      </select>
    </div>
  );
}
