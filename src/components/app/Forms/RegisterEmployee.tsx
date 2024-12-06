import { useDataBase } from "@/context/DB_DataContext";
import { Address, Employee, Endpoint, Methods, StatusResponse } from "@/types/types";
import AddressForm from "../FormsTemplates/AddressForm";
import { useState } from "react";
import { InitialAddressData, InitialEmployeeData } from "@/types/constValues";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import Button from "@/components/utils/Button";
import SchoolSearcher from "../Search/SchoolSearcher";
import IndividualForm from "../FormsTemplates/IndividualForm";
import EmployeeForm from "../FormsTemplates/EmployeeForm";

export default function RegisterEmployee() {
  const { schoolGET: infosGET, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  // Employee State and Handler
  const [employeeData, setEmployeeData] = useState<Employee>(InitialEmployeeData);

  const [IsSchoolSelected, setIsSchoolSelected] = useState<boolean>(false);

  const handleEmployeeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedSchool = infosGET?.find((school) => school.nomeEscola === value);

    if (name === "escola" && selectedSchool) {
      setEmployeeData({
        ...employeeData,
        localTrabalho: selectedSchool.nomeEscola,
      });
      setIsSchoolSelected(true);
    } else {
      setEmployeeData({
        ...employeeData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Address State and Handler
  const [employeeAddress, setEmployeeAddress] = useState<Address>(InitialAddressData);
  const handleEmployeeAddress = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeAddress({
      ...employeeAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!IsSchoolSelected) {
      alert("Selecione uma Escola! As opções abaixo serão desbloqueadas assim que uma escola selecionada.");
      return;
    } else if (employeeData.cpf.length !== 14) {
      alert("CPF inválido! Certifique-se de que ele foi digitado corretamente.");
      return;
    }

    // Submit Handler for data, with swapped infos
    handleSubmitDataBase(
      {
        ...employeeData,
        endereco: employeeAddress,
        nomeConjuge: employeeData.estadoCivil !== "Solteiro" ? employeeData.nomeConjuge : null,
        foneConjuge: employeeData.estadoCivil !== "Solteiro" ? employeeData.foneConjuge : null,
      },
      Methods.POST,
      Endpoint.Funcionário
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
          <SchoolSearcher handler={handleEmployeeData} schoolGET={infosGET} />

          {/* DATA SECTION */}
          <fieldset className="flex flex-col items-center justify-center gap-10" disabled={!IsSchoolSelected}>
            <IndividualForm individualData={employeeData} handleIndividualData={handleEmployeeData} />
            <EmployeeForm employeeData={employeeData} handleEmployeeData={handleEmployeeData} />
            <AddressForm addressData={employeeAddress} handleAddressData={handleEmployeeAddress} />
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
