import { InitialEmployeeData } from "@/types/constValues";
import { Employee } from "@/types/types";
import { Select } from "flowbite-react";
import { useState } from "react";

interface EmployeeSearcherInterface {
  handler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  employeeGET?: Employee[] | null;
}

export default function EmployeeSearcher({ handler, employeeGET }: EmployeeSearcherInterface) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(InitialEmployeeData);

  return (
    <div className="flex flex-col w-full items-center max-w-[500px]">
      <h1 className="text-lg font-bold text-extraColor">ESCOLHA UMA FUNCIONÁRIO</h1>
      <Select
        className="text-center"
        // cspell: disable-next-line
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
        {employeeGET?.length !== 0 ? (
          employeeGET?.map((value) => {
            return (
              <option key={value.id} value={value.nome}>
                {value.nome}
              </option>
            );
          })
        ) : (
          <option disabled value="null">
            Nenhum funcionário disponível!
          </option>
        )}
      </Select>
    </div>
  );
}
