import { Methods, SchoolDataType, StatusResponse } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// CONTEXT CREATED
type SchoolDataContextType = {
  handleSubmitSchool: (infos: SchoolDataType, methodSelection: Methods) => void;
  infosGET: SchoolDataType[] | null;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
  isDataSended: boolean;
  setIsDataSended: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SchoolDataContext = createContext<SchoolDataContextType>({
  handleSubmitSchool: () => undefined,
  infosGET: null,
  responseCode: StatusResponse.Null,
  setResponseCode: () => null,
  isDataSended: false,
  setIsDataSended: () => undefined,
});

// useContext CREATED
export const useSchoolData = () => {
  return useContext(SchoolDataContext);
};

// CONTEXT REACT FUNCTION
export function SchoolDataContextProvider(props: React.PropsWithChildren) {
  const [infosGET, setInfosGET] = useState<SchoolDataType[] | null>(null);
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  const [isDataSended, setIsDataSended] = useState<boolean>(false);

  useEffect(() => {
    fetch(``, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: SchoolDataType[]) => {
        setInfosGET(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  const handleSubmitSchool = (infos: SchoolDataType, methodSelection: Methods) => {
    fetch(`http://localhost:8080/escola`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseCode(response.status);
      })
      .catch((error) => {
        setIsDataSended(true); // INSERT IN .then
        setTimeout(() => setResponseCode(200), 1000); // DELETE IT
        console.log(error);
      });
  };

  return (
    <SchoolDataContext.Provider
      value={{ infosGET, handleSubmitSchool, responseCode, setResponseCode, isDataSended, setIsDataSended }}
    >
      {props.children}
    </SchoolDataContext.Provider>
  );
}
