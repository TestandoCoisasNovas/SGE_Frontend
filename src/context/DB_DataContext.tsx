import { Managers, Methods, SchoolDataType, StatusResponse } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import test from "@/context/test.json";

// CONTEXT CREATED
type DataBaseContextType = {
  handleSubmitDataBase: (infos: SchoolDataType | Managers, methodSelection: Methods, endpoint: string) => void;
  infosGET: SchoolDataType[] | null;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
  isDataSended: boolean;
  setIsDataSended: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DataBaseContext = createContext<DataBaseContextType>({
  handleSubmitDataBase: () => undefined,
  infosGET: null,
  responseCode: StatusResponse.Null,
  setResponseCode: () => null,
  isDataSended: false,
  setIsDataSended: () => undefined,
});

// useContext CREATED
export const useDataBase = () => {
  return useContext(DataBaseContext);
};

// CONTEXT REACT FUNCTION
export function DataBaseContextProvider(props: React.PropsWithChildren) {
  const [infosGET, setInfosGET] = useState<SchoolDataType[] | null>(test);
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  const [isDataSended, setIsDataSended] = useState<boolean>(false);

  useEffect(() => {
    // GET - INSERIR O LOCALHOST AQUI EM FETCH
    fetch(`http://281-103-756.local:8080/escola/get`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data: SchoolDataType[]) => {
        setInfosGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  // DEMAIS FUNÇÕES
  const handleSubmitDataBase = (infos: SchoolDataType | Managers, methodSelection: Methods, endpoint: string) => {
    fetch(`http://localhost:8080/${endpoint}`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseCode(response.status);
        setIsDataSended(true);
      })
      .catch((error) => {
        // setIsDataSended(true); // DELETE IT
        // setTimeout(() => setResponseCode(200), 1000); // DELETE IT
        // console.log(infos);
        console.log(error);
      });
  };

  return (
    <DataBaseContext.Provider
      value={{ infosGET, handleSubmitDataBase, responseCode, setResponseCode, isDataSended, setIsDataSended }}
    >
      {props.children}
    </DataBaseContext.Provider>
  );
}
