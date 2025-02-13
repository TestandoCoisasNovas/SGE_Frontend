import { Employee, Managers, Methods, School, StatusResponse } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useState, useEffect, SetStateAction, Dispatch, PropsWithChildren } from "react";
import EmployeeInitial from "@/context/TEST_employee.json";

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
  setResponseCode: (value: SetStateAction<number>) => void;
  isDataSended: boolean;
  setIsDataSended: Dispatch<SetStateAction<boolean>>;
  backendUserData: Employee | null;
};

export const DataBaseContext = createContext<DataBaseContextType>({
  handleSubmitDataBase: () => undefined,
  schoolGET: null,
  employeeGET: null,
  responseCode: StatusResponse.Null,
  setResponseCode: () => null,
  isDataSended: false,
  setIsDataSended: () => undefined,
  backendUserData: null,
});

// useContext Created
export const useDataBase = () => {
  return useContext(DataBaseContext);
};

// CONTEXT REACT FUNCTION
export function DataBaseContextProvider(props: PropsWithChildren) {
  const [schoolGET, setSchoolGET] = useState<School[] | null>(null);
  const [employeeGET, setEmployeeGET] = useState<Employee[] | null>(null);

  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  const [isDataSended, setIsDataSended] = useState<boolean>(false);

  const [backendUserData, setBackendUserData] = useState<Employee | null>(EmployeeInitial);
  const { user } = useUser();

  // Trocar variável ip entre "localhost" ou "281-103-756.local"
  const ip = "281-103-756.local";

  // SCHOOL Fetch GET
  useEffect(() => {
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
    fetch(`http://${ip}:8080/funcionario/get`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: Employee[]) => {
        setEmployeeGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // BACKEND MATCH USER Fetch GET
  useEffect(() => {
    if (user?.cpf) {
      fetch(`http://${ip}:8080/funcionario/get/${user?.cpf}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: Employee) => {
          setBackendUserData(data);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  // Primary Handle Submit
  const handleSubmitDataBase = (
    infos: Partial<School | Managers | Employee>,
    methodSelection: Methods,
    endpoint: string
  ) => {
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
        backendUserData,
      }}
    >
      {props.children}
    </DataBaseContext.Provider>
  );
}
