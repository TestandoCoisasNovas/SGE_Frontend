import { Employee, Managers, Methods, SchoolDataType, StatusResponse } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import testSchool from "@/context/TEST_school.json";
import testEmployee from "@/context/TEST_employee.json";

// Context Created
type DataBaseContextType = {
  handleSubmitDataBase: (
    infos: SchoolDataType | Managers | Employee,
    methodSelection: Methods,
    endpoint: string
  ) => void;
  schoolGET: SchoolDataType[] | null;
  employeeGET: Employee[] | null;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
  isDataSended: boolean;
  setIsDataSended: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DataBaseContext = createContext<DataBaseContextType>({
  handleSubmitDataBase: () => undefined,
  schoolGET: null,
  employeeGET: null,
  responseCode: StatusResponse.Null,
  setResponseCode: () => null,
  isDataSended: false,
  setIsDataSended: () => undefined,
});

// useContext Created
export const useDataBase = () => {
  return useContext(DataBaseContext);
};

// CONTEXT REACT FUNCTION
export function DataBaseContextProvider(props: React.PropsWithChildren) {
  const [schoolGET, setSchoolGET] = useState<SchoolDataType[] | null>(testSchool);
  const [employeeGET, setEmployeeGET] = useState<Employee[] | null>(testEmployee);
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  const [isDataSended, setIsDataSended] = useState<boolean>(false);

  // SCHOOL Fetch GET
  useEffect(() => {
    // GET - INSERIR O LOCALHOST EM FETCH DENTRO DOS ` `
    fetch(`http://281-103-756.local:8080/escola/get`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: SchoolDataType[]) => {
        setSchoolGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // EMPLOYEE Fetch GET
  useEffect(() => {
    // GET - INSERIR O LOCALHOST EM FETCH DENTRO DOS ` `
    fetch(`http://281-103-756.local:8080/funcionario/get`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: Employee[]) => {
        setEmployeeGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // Primary Handle Submit
  const handleSubmitDataBase = (
    infos: SchoolDataType | Managers | Employee,
    methodSelection: Methods,
    endpoint: string
  ) => {
    fetch(`http://281-103-756.local:8080/${endpoint}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        console.log(infos);
        setResponseCode(response.status);
        setIsDataSended(true);
      })
      .catch((error) => {
        // setIsDataSended(true); // DELETE IT
        // setTimeout(() => setResponseCode(200), 1000); // DELETE IT
        console.log(infos);
        console.log(error);
      });
  };

  return (
    <DataBaseContext.Provider
      value={{
        schoolGET,
        employeeGET,
        handleSubmitDataBase,
        responseCode,
        setResponseCode,
        isDataSended,
        setIsDataSended,
      }}
    >
      {props.children}
    </DataBaseContext.Provider>
  );
}
