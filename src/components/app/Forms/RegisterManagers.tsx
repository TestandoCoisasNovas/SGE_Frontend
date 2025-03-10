import { useDataBase } from "@/context/DB_DataContext";
import { Description, Endpoint, Managers, Methods, StatusResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { InitialManagersData } from "@/types/constValues";
import ManagersForm from "../FormsTemplates/ManagersForm";
import SchoolSearcher from "../Search/SchoolSearcher";
import EmployeeSearcher from "../Search/EmployeeSearcher";
import { twMerge } from "tailwind-merge";
import SendButton from "@/components/utils/SendButton";

export default function RegisterManager() {
  const { schoolGET, employeeGET, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  // Admin State and Handler
  const [managerData, setAdminData] = useState<Managers>(InitialManagersData);

  const [isSchoolSelected, setIsSchoolSelected] = useState<boolean>(false);
  const [isEmployeeSelected, setIsEmployeeSelected] = useState<boolean>(false);

  const handleManagerData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedSchool = schoolGET?.find((school) => school.nomeEscola === value);
    const selectedEmployee = employeeGET?.find((employee) => employee.nome === value);

    if (name === "escola" && selectedSchool) {
      setAdminData({
        ...managerData,
        escola: {
          ...selectedSchool,
        },
      });
      setIsSchoolSelected(true);
      // cspell: disable-next-line
    } else if (name === "funcionario" && selectedEmployee) {
      setAdminData({
        ...managerData,
        ...selectedEmployee,
      });
      setIsEmployeeSelected(true);
    } else {
      setAdminData({
        ...managerData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSchoolSelected || !isEmployeeSelected) {
      alert(
        "Selecione uma Escola e um Funcionário! As opções abaixo serão desbloqueadas assim que uma escola selecionada."
      );
      return;
    } else if (managerData.cpf.length !== 14) {
      alert("CPF inválido! Certifique-se de que ele foi digitado corretamente.");
      return;
    }

    // Submit Handler for data, with swapped infos
    handleSubmitDataBase(
      {
        cpf: managerData.cpf,
        cargo: managerData.cargo,
        portaria: managerData.portaria,
      },
      Methods.PUT,
      Endpoint.Gestor,
      Description.RegisterManager
    );

    setResponseCode(StatusResponse.Loading);
  };

  // RESET DATA WHEN SUCCESS SUBMIT
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setAdminData(InitialManagersData);
      setIsSchoolSelected(false);
      setIsEmployeeSelected(false);
    }
  }, [responseCode]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-foreground rounded-md pb-4 gap-4">
        <h1
          className={twMerge(
            "text-lg font-bold text-extraColor p-3 w-full text-center",
            "rounded-t-md bg-gray-500 dark:bg-gray-700"
          )}
        >
          CADASTRAR NOVO ADMINISTRADOR
        </h1>
        <fieldset
          className="flex flex-col gap-10"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          {/* SCHOOL SELECT SECTION */}
          <SchoolSearcher handler={handleManagerData} schoolGET={schoolGET} />

          {/* EMPLOYEE SELECT SECTION */}
          <fieldset className="flex flex-col items-center justify-center gap-10" disabled={!isSchoolSelected}>
            <EmployeeSearcher
              handler={handleManagerData}
              employeeGET={
                // cspell: disable-next-line
                schoolGET?.find((school) => school.nomeEscola === managerData.escola.nomeEscola)?.funcionario
              }
            />
          </fieldset>

          {/* DIRETOR/SECRETARIO DATA SECTION */}
          <fieldset
            className="flex flex-col items-center justify-center gap-10"
            disabled={!isSchoolSelected || !isEmployeeSelected}
          >
            <ManagersForm managerData={managerData} handleManagerData={handleManagerData} />
          </fieldset>
        </fieldset>

        {/* BUTTON SENDER AND STATUS */}
        <SendButton type="submit">Cadastrar Administrador</SendButton>
      </form>
    </>
  );
}
