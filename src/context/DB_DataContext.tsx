import { Employee, Managers, Methods, School, StatusResponse } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useState, useEffect, SetStateAction, Dispatch, PropsWithChildren } from "react";

// Trocar variável ip entre "localhost" ou "282-644-017.local"
const ip = "282-644-017.local";

// cspell: disable
// Context Created
type DataBaseContextType = {
  handleSubmitDataBase: (
    infos: Partial<School | Managers | Employee>,
    methodSelection: Methods,
    endpoint: string,
    description: string
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

  const [userLocation, setUserLocation] = useState<number[]>([0, 0]);

  // GET LOCATION PERMISSION
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => console.error("Erro ao obter localização:", error),
      { enableHighAccuracy: true }
    );
  }

  const [backendUserData, setBackendUserData] = useState<Employee | null>(null);
  const { user } = useUser();

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
    endpoint: string,
    description: string
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
        setResponseCode(StatusResponse.OtherError);
        console.log(infos);
        console.log(error);
      });
    fetch(`http://${ip}:8080/auditoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataHora: new Date(),
        maquina: userLocation,
        descricao: description,
        funcionario: user?.cpf,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
