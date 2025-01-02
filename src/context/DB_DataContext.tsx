import { Employee, Managers, Methods, School, StatusResponse } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context Created
type DataBaseContextType = {
  handleSubmitDataBase: (
    infos: Partial<School | Managers | Employee>,
    methodSelection: Methods,
    endpoint: string
  ) => void;
  schoolGET: School[] | null;
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
  const [schoolGET, setSchoolGET] = useState<School[] | null>(null);
  const [employeeGET, setEmployeeGET] = useState<Employee[] | null>(null);
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  const [isDataSended, setIsDataSended] = useState<boolean>(false);

  // Trocar variável ip entre "localhost" ou "281-103-756.local"
  const ip = "281-103-756.local";

  // SCHOOL Fetch GET
  useEffect(() => {
    // GET - INSERIR O LOCALHOST EM FETCH DENTRO DOS ` `
    fetch(`http://${ip}:8080/escola/get`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: School[]) => {
        setSchoolGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // EMPLOYEE Fetch GET
  useEffect(() => {
    // GET - INSERIR O LOCALHOST EM FETCH DENTRO DOS ` `
    fetch(`http://${ip}:8080/funcionario/get`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: Employee[]) => {
        setEmployeeGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // Primary Handle Submit
  const handleSubmitDataBase = (infos: Partial<School | Managers | Employee>, methodSelection: Methods, endpoint: string) => {
    fetch(`http://${ip}:8080/${endpoint}`, {
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
