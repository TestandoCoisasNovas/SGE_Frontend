import { Methods, SchoolDataType } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// CONTEXT CREATED
type SchoolDataContextType = {
  handleSubmitSchool: (infos: SchoolDataType, methodSelection: Methods) => void;
  infosGET: SchoolDataType[] | null;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
};

export const SchoolDataContext = createContext<SchoolDataContextType>({
  handleSubmitSchool: () => undefined,
  infosGET: null,
  responseCode: 0,
  setResponseCode: () => null,
});

// useContext CREATED
export const useSchoolData = () => {
  return useContext(SchoolDataContext);
};

// CONTEXT REACT FUNCTION
export function SchoolDataContextProvider(props: React.PropsWithChildren) {
  const [infosGET, setInfosGET] = useState<SchoolDataType[] | null>(null);
  const [responseCode, setResponseCode] = useState<number>(0);

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
        console.log("Renderizou o envio");
        console.log("Resposta do Backend:", response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SchoolDataContext.Provider value={{ infosGET: infosGET, handleSubmitSchool, responseCode, setResponseCode }}>
      {props.children}
    </SchoolDataContext.Provider>
  );
}
