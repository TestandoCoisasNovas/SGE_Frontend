import { useDataBase } from "@/context/DB_DataContext";
import { Endpoint, Managers, Methods, StatusResponse } from "@/types/types";
import { useState } from "react";
import { InitialManagersData } from "@/types/constValues";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import Button from "@/components/utils/Button";
import ManagersForm from "../FormsTemplates/ManagersForm";
import SchoolSearcher from "../Search/SchoolSearcher";
import EmployeeSearcher from "../Search/EmployeeSearcher";

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

  const generateSHA256 = async (messageReceived: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(messageReceived);

    // Create Hash SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the Hash Created to Hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSchoolSelected || !isEmployeeSelected) {
      alert(
        "Selecione uma Escola e um funcionário! As opções abaixo serão desbloqueadas assim que uma escola selecionada."
      );
      return;
    } else if (managerData.cpf.length !== 14) {
      alert("CPF inválido! Certifique-se de que ele foi digitado corretamente.");
      return;
    }

    // Select only 6 first cpf numbers and generate SHA-256 hash
    const password = managerData.cpf.match(/\d{1,6}/)?.[0] || "";
    const hashedPassword = await generateSHA256(password);

    // Submit Handler for data, with swapped infos
    handleSubmitDataBase(
      {
        ...managerData,
        usuario: {
          login: managerData.cpf,
          password: hashedPassword,
          perfil: managerData.cargo,
          status: false,
        },
      },
      Methods.POST,
      Endpoint.Diretor
    );

    setResponseCode(StatusResponse.Loading);
  };

  return (
    <div className="flex px-4" onClick={() => setResponseCode(StatusResponse.Null)}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <fieldset
          className="flex flex-col items-center justify-center gap-10"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          {/* SCHOOL SELECT SECTION */}
          <SchoolSearcher handler={handleManagerData} schoolGET={schoolGET} />

          {/* EMPLOYEE SELECT SECTION */}
          <fieldset className="flex flex-col items-center justify-center gap-10" disabled={!isSchoolSelected}>
            <EmployeeSearcher
              handler={handleManagerData}
              employeeGET={
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
        <div>
          {responseCode === StatusResponse.Loading ? (
            <Loading width={40} />
          ) : responseCode === StatusResponse.Success || responseCode === StatusResponse.Error ? (
            <ConfirmationStatus statusResponse={responseCode} />
          ) : (
            responseCode === StatusResponse.Null && <Button type="submit">Enviar Dados</Button>
          )}
        </div>
      </form>
    </div>
  );
}
