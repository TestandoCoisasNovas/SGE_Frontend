import { useDataBase } from "@/context/DB_DataContext";
import { Address, Description, Employee, Endpoint, Methods, StatusResponse } from "@/types/types";
import AddressForm from "../FormsTemplates/AddressForm";
import { FormEvent, useEffect, useState } from "react";
import { InitialAddressData, InitialEmployeeData } from "@/types/constValues";
import SchoolSearcher from "../Search/SchoolSearcher";
import IndividualForm from "../FormsTemplates/IndividualForm";
import EmployeeForm from "../FormsTemplates/EmployeeForm";
import { twMerge } from "tailwind-merge";
import SendButton from "@/components/utils/SendButton";

// cspell: disable
export default function RegisterEmployee() {
  const { schoolGET, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  // Employee State and Handler
  const [employeeData, setEmployeeData] = useState<Employee>(InitialEmployeeData);

  const [IsSchoolSelected, setIsSchoolSelected] = useState<boolean>(false);

  const handleEmployeeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedSchool = schoolGET?.find((school) => school.nomeEscola === value);

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

  // Handle Dates
  const handleDates = (value: Date | null, name: string) => {
    setEmployeeData({
      ...employeeData,
      [name]: value ? value.toString() : "",
    });
  };

  // MAIN SUBMIT FUNCTION
  const handleSubmit = async (e: FormEvent) => {
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
      Endpoint.Funcionário,
      Description.RegisterEmployee
    );

    setResponseCode(StatusResponse.Loading);
  };

  // RESET DATA WHEN SUCCESS SUBMIT
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setEmployeeData(InitialEmployeeData);
      setIsSchoolSelected(false);
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
          CADASTRAR NOVO FUNCIONÁRIO
        </h1>
        <fieldset
          className="flex flex-col items-center justify-center gap-4 md:px-64"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          {/* SCHOOL SELECT SECTION */}
          <SchoolSearcher handler={handleEmployeeData} schoolGET={schoolGET} />

          {/* DATA SECTION */}
          <fieldset className="flex flex-col items-center justify-center gap-4" disabled={!IsSchoolSelected}>
            <IndividualForm
              individualData={employeeData}
              handleIndividualData={handleEmployeeData}
              handleDates={handleDates}
            />
            <EmployeeForm
              employeeData={employeeData}
              handleEmployeeData={handleEmployeeData}
              handleDates={handleDates}
            />
            <AddressForm addressData={employeeAddress} handleAddressData={handleEmployeeAddress} />
          </fieldset>
        </fieldset>

        {/* BUTTON SENDER AND STATUS */}
        <SendButton type="submit">Cadastrar Funcionário</SendButton>
      </form>
    </>
  );
}
